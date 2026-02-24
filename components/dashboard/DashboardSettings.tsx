'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Settings2, Eye, EyeOff, GripVertical, RotateCcw, X, Check } from 'lucide-react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface TileConfig {
    id: string
    name: string
    visible: boolean
    size: 'small' | 'medium' | 'large' | 'xlarge' | 'full'
}

export const DEFAULT_TILES: TileConfig[] = [
    // ── Row 1: Essentials (col-3 each = 12 cols) ─────────────────────────
    { id: 'visa', name: 'Visa Countdown', visible: true, size: 'small' },
    { id: 'safe-spend', name: 'Daily Safe Spend', visible: true, size: 'small' },
    { id: 'nhs-navigator', name: 'NHS & GP Navigator', visible: true, size: 'small' },
    { id: 'docs', name: 'Document Vault', visible: true, size: 'small' },

    // ── Row 2: Finance (col-6 each) ──────────────────────────────
    { id: 'budget', name: 'Budget Planner', visible: true, size: 'large' },
    { id: 'discounts', name: 'Student Discounts & Groceries', visible: true, size: 'large' },

    // ── Row 3: Travel, Networking & Daily Life (col-4 each = 12 cols) ─────────────────────────
    { id: 'railcard', name: 'Railcard & Travel Manager', visible: true, size: 'medium' },
    { id: 'networking', name: 'Networking CRM Tracker', visible: true, size: 'medium' },
    { id: 'tasteofhome', name: 'Taste of Home Finder', visible: true, size: 'medium' },

    // ── Row 4: Full-width — Work Log (col-12) ─────────────────────────────────
    { id: 'work', name: 'Work Hour Log', visible: true, size: 'full' },

    // ── Row 5: Full-width — Job Tracker (col-12) ──────────────────────────────
    { id: 'jobs', name: 'Job Application Tracker', visible: true, size: 'full' },

    // ── Row 6: AI Suite ────────────────────
    { id: 'ai-assistant', name: 'Survival AI Assistant (Pro)', visible: true, size: 'medium' },
    { id: 'interview-coach', name: 'AI Interview Coach (Pro)', visible: true, size: 'medium' },
    { id: 'ai-writer', name: 'AI Cover Letter (Pro)', visible: true, size: 'medium' },
    { id: 'scanner', name: 'Resume ATS Scanner (Pro)', visible: true, size: 'full' }
]

interface SortableItemProps {
    tile: TileConfig
    toggleVisibility: (id: string) => void
    updateSize: (id: string, size: TileConfig['size']) => void
}

function SortableItem({ tile, toggleVisibility, updateSize }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: tile.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
        position: 'relative' as const,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between p-2 rounded-xl transition-all ${isDragging ? 'bg-[var(--bg-raised)] border border-[var(--accent)] shadow-xl scale-[1.02] z-50' : 'bg-[var(--bg-card)] border border-[var(--border)] shadow-sm'
                } ${!tile.visible && !isDragging ? 'opacity-50 grayscale bg-[var(--bg-raised)] border-transparent' : ''
                }`}
        >
            <div className="flex items-center gap-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="p-1.5 rounded-lg bg-[var(--bg-raised)] border border-[var(--border)] cursor-grab active:cursor-grabbing hover:bg-[var(--bg-card)] transition-colors"
                >
                    <GripVertical className="w-4 h-4 text-[var(--text-muted)]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-[var(--text)]">{tile.name}</span>
                    {/* Size Selector */}
                    <select
                        value={tile.size}
                        onChange={(e) => updateSize(tile.id, e.target.value as TileConfig['size'])}
                        className="text-xs bg-transparent text-[var(--text-sub)] hover:text-[var(--text)] border-none p-0 cursor-pointer outline-none mt-1 transition-colors w-fit"
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <option value="small">S (1/4 Width)</option>
                        <option value="medium">M (1/3 Width)</option>
                        <option value="large">L (1/2 Width)</option>
                        <option value="xlarge">XL (2/3 Width)</option>
                        <option value="full">Full Width</option>
                    </select>
                </div>
            </div>
            <button
                onClick={() => toggleVisibility(tile.id)}
                className={`p-2 rounded-xl transition-all ${tile.visible
                    ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                    }`}
            >
                {tile.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
        </div>
    )
}

interface DashboardSettingsPanelProps {
    onClose: () => void
    onLayoutChange: (layout: TileConfig[]) => void
    userId: string
    initialLayout: TileConfig[] | null
}

export function DashboardSettingsPanel({ onClose, onLayoutChange, userId, initialLayout }: DashboardSettingsPanelProps) {
    const supabase = createClient()
    const [tiles, setTiles] = useState<TileConfig[]>(DEFAULT_TILES)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        if (initialLayout && Array.isArray(initialLayout) && initialLayout.length > 0) {
            try {
                // The saved array contains the order.
                const merged = initialLayout.map((s: any) => {
                    const def = DEFAULT_TILES.find(d => d.id === s.id)
                    // Ensure saved layouts pickup size preferences but fallback to default sizes if new and keeping visibility
                    return def ? { ...def, size: s.size ?? def.size, visible: s.visible } : null
                }).filter((t): t is TileConfig => t !== null)

                // Add any new tiles that aren't in the saved layout
                const missing = DEFAULT_TILES.filter(def => !initialLayout.find((s: any) => s.id === def.id))
                const finalLayout = [...merged, ...missing]

                setTiles(finalLayout)
                onLayoutChange(finalLayout)
            } catch (e) {
                console.error("Failed to parse initial layout", e)
                onLayoutChange(DEFAULT_TILES)
            }
        } else {
            // No layout found in DB, use default
            onLayoutChange(DEFAULT_TILES)
        }
    }, [initialLayout])

    const updateSize = (id: string, size: TileConfig['size']) => {
        setTiles(prev => prev.map(t => t.id === id ? { ...t, size } : t))
    }

    const toggleVisibility = (id: string) => {
        const updated = tiles.map(t => t.id === id ? { ...t, visible: !t.visible } : t)
        setTiles(updated)
        onLayoutChange(updated)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            const oldIndex = tiles.findIndex((i) => i.id === active.id)
            const newIndex = tiles.findIndex((i) => i.id === over?.id)
            const updated = arrayMove(tiles, oldIndex, newIndex)
            setTiles(updated)
            onLayoutChange(updated)
        }
    }

    const [isSaving, setIsSaving] = useState(false)

    const save = async () => {
        setIsSaving(true)
        try {
            await supabase
                .from('profiles')
                .update({ dashboard_layout: tiles })
                .eq('id', userId)

            // Clean up old local storage if it exists to prevent conflicts
            localStorage.removeItem('student-mind-layout-v19')

            onLayoutChange(tiles)
            onClose()
        } catch (error) {
            console.error('Failed to save layout to profile:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const reset = async () => {
        setIsSaving(true)
        try {
            await supabase
                .from('profiles')
                .update({ dashboard_layout: null })
                .eq('id', userId)

            setTiles(DEFAULT_TILES)
            onLayoutChange(DEFAULT_TILES)
            onClose()
        } catch (error) {
            console.error('Failed to reset layout:', error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl shadow-sm overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="px-6 py-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-raised)]">
                <div>
                    <h2 className="text-lg font-bold text-[var(--text)]">Customize Dashboard</h2>
                    <p className="text-xs text-[var(--text-muted)]">Drag to reorder or toggle visibility.</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-[var(--bg-card)] transition-colors">
                    <X className="w-5 h-5 text-[var(--text-muted)]" />
                </button>
            </div>

            <div className="p-4 sm:p-6 h-[400px] overflow-y-auto space-y-2 pb-8 custom-scrollbar">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={tiles.map(t => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tiles.map((tile) => (
                            <SortableItem
                                key={tile.id}
                                tile={tile}
                                toggleVisibility={toggleVisibility}
                                updateSize={updateSize}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--bg-raised)] flex items-center justify-between gap-3 relative z-10 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)]">
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Default
                </button>
                <button
                    onClick={save}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-[var(--accent)] text-white text-sm font-bold rounded-xl shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-all disabled:opacity-50"
                >
                    {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Check className="w-4 h-4" />
                    )}
                    Save & Finish
                </button>
            </div>
        </div>
    )
}
