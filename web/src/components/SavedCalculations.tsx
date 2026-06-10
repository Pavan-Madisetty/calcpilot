'use client';

import React, { useState, useEffect } from 'react';
import {
  getSavedCalculations,
  deleteSavedCalculation,
  renameSavedCalculation,
  SavedCalculation
} from '../lib/store';
import { Trash2, Edit2, Check, X, Calendar, Download, Bookmark, FileSpreadsheet } from 'lucide-react';

export default function SavedCalculations() {
  const [list, setList] = useState<SavedCalculation[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    setList(getSavedCalculations());
  }, []);

  const handleDelete = (id: string) => {
    deleteSavedCalculation(id);
    setList(getSavedCalculations());
  };

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSaveRename = (id: string) => {
    if (editName.trim()) {
      renameSavedCalculation(id, editName.trim());
      setEditingId(null);
      setList(getSavedCalculations());
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExportJson = (item: SavedCalculation) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `calcpilot-${item.type}-${item.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Saved Calculations
        </h2>
        <p className="text-sm text-muted-foreground">
          Access, manage, and export your saved logs locally or across synced profiles.
        </p>
      </div>

      <div className="space-y-4">
        {list.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-card border border-border rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition duration-200 hover:border-slate-300 dark:hover:border-slate-700"
          >
            {/* Left Content */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                  {item.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar size={10} /> {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>

              {editingId === item.id ? (
                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-2 py-1 text-sm bg-input border border-border rounded focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveRename(item.id)}
                    className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleStartEdit(item.id, item.name)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                    title="Rename"
                  >
                    <Edit2 size={12} />
                  </button>
                </div>
              )}

              {/* Input parameters details */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {Object.entries(item.inputs).map(([key, val]) => (
                  <span key={key}>
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                    {typeof val === 'number' && val > 1000 ? formatCurrency(val) : String(val)}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Button Bar */}
            <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-border">
              <button
                onClick={() => handleExportJson(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border hover:bg-muted font-bold rounded-lg text-slate-700 dark:text-slate-300 transition cursor-pointer"
                title="Export Data"
              >
                <Download size={14} /> Export JSON
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 border border-transparent hover:border-red-500/20 rounded-lg transition cursor-pointer"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl text-muted-foreground flex flex-col items-center gap-3">
            <Bookmark size={36} className="text-slate-300 dark:text-slate-700" />
            <div>
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">No Saved Calculations</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Your saved items list is empty. Run a calculator and press &quot;Save Calculation&quot;.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
