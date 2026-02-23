'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, GripVertical, RotateCcw, Check } from 'lucide-react'
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
    colSpan: number
    rowSpan: number
}

const DEFAULT_TILES: TileConfig[] = [
    { id: 'visa', name: 'Visa Countdown', visible: true, colSpan: 1, rowSpan: 2 },
    { id: 'work', name: 'Work Hour Log', visible: true, colSpan: 2, rowSpan: 2 },
    { id: 'budget', name: 'Budget Planner', visible: true, colSpan: 3, rowSpan: 1 },
    { id: 'ai-assistant', name: 'Survival AI Assistant (Pro)', visible: true, colSpan: 1, rowSpan: 2 },
    { id: 'ai-writer', name: 'AI Cover Letter (Pro)', visible: true, colSpan: 1, rowSpan: 2 },
    { id: 'academic', name: 'Academic Tracker', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'jobs', name: 'Job Application Tracker', visible: true, colSpan: 2, rowSpan: 1 },
    { id: 'checklist', name: 'Landing Checklist', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'resources', name: 'Local Resources', visible: true, colSpan: 2, rowSpan: 1 },
    { id: 'docs', name: 'Document Vault', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'culture', name: 'UK Survival Guide', visible: true, colSpan: 2, rowSpan: 1 },
    { id: 'cv', name: 'CV & Job Prep', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'accommodation', name: 'Accommodation Manager', visible: true, colSpan: 2, rowSpan: 1 },
    { id: 'scanner', name: 'Resume ATS Scanner (Pro)', visible: true, colSpan: 3, rowSpan: 2 },
]

interface SortableItemProps {
    tile: TileConfig
    toggleVisibility: (id: string) => void
}

function SortableItem({ tile, toggleVisibility }: SortableItemProps) {
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
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isDragging ? 'bg-[var(--bg-raised)] border-[var(--accent)] shadow-xl scale-[1.02] z-50' : 'bg-[var(--bg-card)] border-[var(--border)] shadow-sm'
                } ${!tile.visible && !isDragging ? 'opacity-50 grayscale bg-[var(--bg-raised)] border-transparent' : ''
                }`}
        >
            <div className="flex items-center gap-4">
                <div
                    {...attributes}
                    {...listeners}
                    className="p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] cursor-grab active:cursor-grabbing hover:bg-[var(--bg-card)] transition-colors"
                >
                    <GripVertical className="w-5 h-5 text-[var(--text-muted)]" />
                </div>
                <div>
                    <span className="text-base font-bold text-[var(--text)] block">{tile.name}</span>
                    <span className="text-xs text-[var(--text-muted)]">
                        {tile.colSpan === 3 ? 'Full Width' : tile.colSpan === 2 ? 'Large Column' : 'Small Column'}
                        {tile.rowSpan > 1 ? ` • ${tile.rowSpan}x Height` : ''}
                    </span>
                </div>
            </div>
            <button
                onClick={() => toggleVisibility(tile.id)}
                className={`p-3 rounded-xl transition-all ${tile.visible
                    ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                    }`}
            >
                {tile.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
        </div>
    )
}

export function DashboardCustomizer() {
    const [tiles, setTiles] = useState<TileConfig[]>(DEFAULT_TILES)
    const [isSaved, setIsSaved] = useState(false)
    const [mounted, setMounted] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem('student-mind-layout-v3')
        if (saved) {
            try {
                const savedTiles = JSON.parse(saved)
                const merged = savedTiles.map((s: any) => {
                    const def = DEFAULT_TILES.find(d => d.id === s.id)
                    return def ? { ...def, visible: s.visible } : null
                }).filter(Boolean)

                const missing = DEFAULT_TILES.filter(def => !savedTiles.find((s: any) => s.id === def.id))
                setTiles([...merged, ...missing])
            } catch (e) {
                setTiles(DEFAULT_TILES)
            }
        }
    }, [])

    const toggleVisibility = (id: string) => {
        setTiles(prev => prev.map(t => t.id === id ? { ...t, visible: !t.visible } : t))
        setIsSaved(false)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            setTiles((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id)
                const newIndex = items.findIndex((i) => i.id === over?.id)
                const updated = arrayMove(items, oldIndex, newIndex)
                return updated
            })
            setIsSaved(false)
        }
    }

    const save = () => {
        localStorage.setItem('student-mind-layout-v3', JSON.stringify(tiles))
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    const reset = () => {
        setTiles(DEFAULT_TILES)
        localStorage.removeItem('student-mind-layout-v3')
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    if (!mounted) return null

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h3 className="text-lg font-bold text-[var(--text)]">Layout Editor</h3>
                    <p className="text-sm text-[var(--text-muted)]">Arrange tiles as you'd like them on your dashboard.</p>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset Default
                    </button>
                    <button
                        onClick={save}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold shadow-lg transition-all ${isSaved
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20 scale-105'
                            : 'bg-[var(--accent)] text-white shadow-[var(--accent)]/20 hover:opacity-90 active:scale-95'
                            }`}
                    >
                        {isSaved ? <><Check className="w-4 h-4" /> Saved!</> : <><Check className="w-4 h-4" /> Save Layout</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
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
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
}
