'use client'

import { useState, useEffect } from 'react'
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
    colSpan: number
    rowSpan: number
}

const DEFAULT_TILES: TileConfig[] = [
    // ── Row 1: The Daily Essentials (Visa + Work = Most critical for compliance) ──
    { id: 'visa', name: 'Visa Countdown', visible: true, colSpan: 1, rowSpan: 2 },
    { id: 'work', name: 'Work Hour Log', visible: true, colSpan: 2, rowSpan: 2 },

    // ── Row 2: Money ──
    { id: 'safe-spend', name: 'Daily Safe Spend', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'budget', name: 'Budget Planner', visible: true, colSpan: 2, rowSpan: 1 },

    // ── Row 3: UK Life Essentials ──
    { id: 'council-tax', name: 'Council Tax Helper', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'nhs-navigator', name: 'NHS & GP Navigator', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'docs', name: 'Document Vault', visible: true, colSpan: 1, rowSpan: 1 },

    // ── Row 4: Academics & Career ──
    { id: 'academic', name: 'Academic Tracker', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'jobs', name: 'Job Application Tracker', visible: true, colSpan: 2, rowSpan: 1 },

    // ── Row 5: AI Career Tools (Pro) ──
    { id: 'ai-assistant', name: 'Survival AI Assistant (Pro)', visible: true, colSpan: 1, rowSpan: 2 },
    { id: 'interview-coach', name: 'AI Interview Coach (Pro)', visible: true, colSpan: 1, rowSpan: 2 },
    { id: 'ai-writer', name: 'AI Cover Letter (Pro)', visible: true, colSpan: 1, rowSpan: 2 },

    // ── Row 6: Job Prep ──
    { id: 'cv', name: 'CV & Job Prep', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'scanner', name: 'Resume ATS Scanner (Pro)', visible: true, colSpan: 2, rowSpan: 2 },

    // ── Row 7: Home & Resources ──
    { id: 'accommodation', name: 'Accommodation Manager', visible: true, colSpan: 1, rowSpan: 1 },
    { id: 'resources', name: 'Local Resources', visible: true, colSpan: 2, rowSpan: 1 },

    // ── Hidden by default (arrival-phase tools, less needed day-to-day) ──
    { id: 'checklist', name: 'Landing Checklist', visible: false, colSpan: 1, rowSpan: 1 },
    { id: 'culture', name: 'UK Survival Guide', visible: false, colSpan: 2, rowSpan: 1 },
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
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${isDragging ? 'bg-[var(--bg-raised)] border-[var(--accent)] shadow-xl scale-[1.02] z-50' : 'bg-[var(--bg-card)] border-[var(--border)] shadow-sm'
                } ${!tile.visible && !isDragging ? 'opacity-50 grayscale bg-[var(--bg-raised)] border-transparent' : ''
                }`}
        >
            <div className="flex items-center gap-3">
                <div
                    {...attributes}
                    {...listeners}
                    className="p-2 rounded-lg bg-[var(--bg-raised)] border border-[var(--border)] cursor-grab active:cursor-grabbing hover:bg-[var(--bg-card)] transition-colors"
                >
                    <GripVertical className="w-4 h-4 text-[var(--text-muted)]" />
                </div>
                <span className="text-sm font-bold text-[var(--text)]">{tile.name}</span>
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

interface DashboardSettingsProps {
    onLayoutChange: (layout: TileConfig[]) => void
}

export function DashboardSettings({ onLayoutChange }: DashboardSettingsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [tiles, setTiles] = useState<TileConfig[]>(DEFAULT_TILES)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        const saved = localStorage.getItem('student-mind-layout-v4')
        if (saved) {
            try {
                const savedTiles = JSON.parse(saved)
                // The saved array contains the order.
                const merged = savedTiles.map((s: any) => {
                    const def = DEFAULT_TILES.find(d => d.id === s.id)
                    // Ensure saved layouts pick up new colSpan/rowSpan defaults while keeping user visibility
                    return def ? { ...def, visible: s.visible } : null
                }).filter(Boolean)

                // Add any new tiles that aren't in the saved layout
                const missing = DEFAULT_TILES.filter(def => !savedTiles.find((s: any) => s.id === def.id))
                const finalLayout = [...merged, ...missing]

                setTiles(finalLayout)
                onLayoutChange(finalLayout)
            } catch (e) {
                console.error("Failed to load layout", e)
                onLayoutChange(DEFAULT_TILES)
            }
        } else {
            onLayoutChange(DEFAULT_TILES)
        }
    }, [])

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

    const save = () => {
        localStorage.setItem('student-mind-layout-v4', JSON.stringify(tiles))
        onLayoutChange(tiles)
        setIsOpen(false)
    }

    const reset = () => {
        setTiles(DEFAULT_TILES)
        localStorage.removeItem('student-mind-layout-v4')
        onLayoutChange(DEFAULT_TILES)
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text)] transition-all text-sm font-medium"
            >
                <Settings2 className="w-4 h-4" />
                Customize
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-raised)]">
                            <div>
                                <h2 className="text-lg font-bold text-[var(--text)]">Customize Dashboard</h2>
                                <p className="text-xs text-[var(--text-muted)]">Live Preview: Changes appear instantly.</p>
                            </div>
                            <button onClick={save} className="p-2 rounded-xl hover:bg-[var(--bg-card)] transition-colors">
                                <X className="w-5 h-5 text-[var(--text-muted)]" />
                            </button>
                        </div>

                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-2">
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

                        <div className="px-6 py-5 border-t border-[var(--border)] bg-[var(--bg-raised)] flex items-center justify-between gap-3">
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Reset to Default
                            </button>
                            <button
                                onClick={save}
                                className="flex items-center gap-2 px-6 py-2 bg-[var(--accent)] text-white text-sm font-bold rounded-xl shadow-lg shadow-[var(--accent)]/20 hover:opacity-90 transition-all"
                            >
                                <Check className="w-4 h-4" />
                                Save & Finish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
