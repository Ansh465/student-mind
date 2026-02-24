'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { FileText, Upload, Download, Trash2, AlertCircle, ShieldCheck, X, FileImage, File, FileBadge, Loader2, CloudUpload, Lock, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import Link from 'next/link'

const BUCKET = 'documents'

// Tier limits
const FREE_MAX_FILES = 1
const FREE_MAX_BYTES = 2 * 1024 * 1024  // 2 MB
const PRO_MAX_BYTES = 10 * 1024 * 1024 // 10 MB

interface VaultFile {
    name: string
    fullPath: string
    size: number
    created_at: string
}

function getFileIcon(name: string) {
    const ext = name.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(ext ?? '')) return FileImage
    if (['pdf'].includes(ext ?? '')) return FileBadge
    return File
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface DocumentVaultProps {
    userId: string
    tier?: 'free' | 'pro'
}

export function DocumentVault({ userId, tier = 'free' }: DocumentVaultProps) {
    const isPro = tier === 'pro'
    const maxFiles = isPro ? Infinity : FREE_MAX_FILES
    const maxBytes = isPro ? PRO_MAX_BYTES : FREE_MAX_BYTES

    const [files, setFiles] = useState<VaultFile[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [dragOver, setDragOver] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const atLimit = files.length >= maxFiles

    const loadFiles = useCallback(async () => {
        setLoading(true)
        const { data, error } = await supabase.storage.from(BUCKET).list(`${userId}/`, {
            sortBy: { column: 'created_at', order: 'desc' }
        })
        if (error) { setError(error.message); setLoading(false); return }

        const vaultFiles: VaultFile[] = (data ?? [])
            .filter(f => f.name !== '.emptyFolderPlaceholder')
            .map(f => ({
                name: f.name,
                fullPath: `${userId}/${f.name}`,
                size: f.metadata?.size ?? 0,
                created_at: f.created_at ?? new Date().toISOString(),
            }))
        setFiles(vaultFiles)
        setLoading(false)
    }, [userId, supabase])

    useEffect(() => { loadFiles() }, [loadFiles])

    const uploadFile = async (file: File) => {
        setError('')

        // Tier enforcement
        if (!isPro && atLimit) {
            setError(`Free tier allows ${FREE_MAX_FILES} file. Upgrade to Pro for unlimited uploads.`)
            return
        }
        if (file.size > maxBytes) {
            setError(`File too large. ${isPro ? 'Max 10 MB' : 'Free tier limit is 2 MB'} per file.`)
            return
        }

        setUploading(true)
        setUploadProgress(0)

        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const path = `${userId}/${Date.now()}_${safeName}`

        const progressInterval = setInterval(() => {
            setUploadProgress(p => Math.min(p + 15, 85))
        }, 150)

        const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
            upsert: false,
            contentType: file.type || 'application/octet-stream',
        })

        clearInterval(progressInterval)
        setUploadProgress(100)

        if (uploadError) {
            setError(uploadError.message)
            setUploading(false)
            setUploadProgress(0)
            return
        }

        setTimeout(() => {
            setUploading(false)
            setUploadProgress(0)
            loadFiles()
        }, 500)
    }

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return
        uploadFile(fileList[0])
    }

    const downloadFile = async (path: string, name: string) => {
        const { data, error } = await supabase.storage.from(BUCKET).download(path)
        if (error || !data) { setError('Download failed: ' + error?.message); return }
        const url = URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = url
        a.download = name
        a.click()
        URL.revokeObjectURL(url)
    }

    const deleteFile = async (path: string) => {
        const { error } = await supabase.storage.from(BUCKET).remove([path])
        if (error) { setError(error.message); return }
        setFiles(prev => prev.filter(f => f.fullPath !== path))
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
    }

    const canUpload = isPro || !atLimit

    return (
        <div className="card rounded-2xl p-6 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                    <h2 className="font-semibold text-[var(--text)]">Document Vault</h2>
                    {!isPro && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--amber-soft)] text-[var(--amber)] border border-[var(--amber)]/30">
                            {files.length}/{FREE_MAX_FILES} FREE
                        </span>
                    )}
                </div>
                <button
                    onClick={() => canUpload && fileInputRef.current?.click()}
                    disabled={uploading || !canUpload}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all ${canUpload
                        ? 'btn-accent shadow-[var(--accent)]/20'
                        : 'bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed opacity-60'
                        }`}
                >
                    {canUpload ? <Upload className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    {canUpload ? 'Upload' : 'Locked'}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
                    onChange={e => handleFiles(e.target.files)}
                />
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl text-xs bg-rose-500/10 border border-rose-500/20 text-rose-500">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="ml-auto"><X className="w-3 h-3" /></button>
                </div>
            )}

            {/* Upload Progress */}
            {uploading && (
                <div className="mb-4 p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-sub)]">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--accent)]" />
                        Uploading securely...
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--bg-input)] overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--accent)] transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                    </div>
                </div>
            )}

            {/* Pro upsell when at free limit */}
            {!isPro && atLimit && (
                <div className="mb-4 rounded-xl border border-[var(--indigo)]/30 bg-[var(--indigo-soft)] p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[var(--indigo)] shrink-0" />
                        <p className="text-xs font-bold text-[var(--indigo)]">1-file limit reached</p>
                    </div>
                    <p className="text-[11px] text-[var(--indigo)]/80 leading-relaxed">
                        Free users can store <strong>1 document (max 2 MB)</strong>. Upgrade to <strong>Pro</strong> for unlimited uploads up to 10 MB each — perfect for storing your Passport, BRP, NI letter, and more.
                    </p>
                    <Link
                        href="/pricing"
                        className="flex items-center justify-center gap-1.5 mt-1 py-2 rounded-lg bg-[var(--indigo)] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Upgrade to Pro
                    </Link>
                </div>
            )}

            {/* Drag & Drop Zone — only show if can upload */}
            {canUpload && !uploading && (
                <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`mb-4 rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${dragOver
                        ? 'border-[var(--accent)] bg-[var(--accent)]/5 scale-[1.01]'
                        : 'border-[var(--border)] hover:border-[var(--accent)]/40 hover:bg-[var(--bg-raised)]'
                        }`}
                >
                    <CloudUpload className={`w-6 h-6 transition-colors ${dragOver ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                    <p className="text-[11px] font-medium text-[var(--text-muted)] text-center">
                        {dragOver ? 'Drop to upload!' : 'Drag & drop a file, or click to browse'}
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)] opacity-60">
                        PDF, images, docs · max {isPro ? '10 MB' : '2 MB'}
                    </span>
                </div>
            )}

            {/* File List */}
            <div className="space-y-2 overflow-y-auto pr-1 flex-1 max-h-[280px]">
                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="w-6 h-6 animate-spin text-[var(--text-muted)]" />
                    </div>
                ) : files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center opacity-50">
                        <FileText className="w-8 h-8 mb-2 text-[var(--text-muted)]" />
                        <p className="text-xs text-[var(--text-muted)]">No files yet.<br />Upload your Passport, BRP, or offer letters.</p>
                    </div>
                ) : (
                    files.map(file => {
                        const Icon = getFileIcon(file.name)
                        const displayName = file.name.replace(/^\d+_/, '')
                        return (
                            <div key={file.fullPath} className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:border-[var(--accent)]/30 group transition-all flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-[var(--accent)]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-[var(--text)] truncate">{displayName}</p>
                                    <p className="text-[10px] text-[var(--text-muted)]">
                                        {formatBytes(file.size)} · {format(new Date(file.created_at), 'dd MMM yyyy')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    <button onClick={() => downloadFile(file.fullPath, displayName)} title="Download" className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-[var(--text-muted)] hover:text-emerald-500 transition-colors">
                                        <Download className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => deleteFile(file.fullPath)} title="Delete" className="p-1.5 rounded-lg hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-medium italic">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>
                    {isPro
                        ? 'Pro · Unlimited files · 10 MB each · Encrypted in transit'
                        : `Free · ${FREE_MAX_FILES} file · 2 MB max · Upgrade for more`}
                </span>
            </div>
        </div>
    )
}
