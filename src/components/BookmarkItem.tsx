"use client";

import { createClient } from "@/lib/supabase/client";
import { Bookmark } from "@/lib/types";
import { useState } from "react";

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("bookmarks").delete().eq("id", bookmark.id);
  };

  return (
    <div className={`group flex items-center justify-between bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/30 hover:border-slate-600/50 rounded-xl px-5 py-4 transition-all duration-200 ${deleting ? "opacity-50 scale-95" : ""}`}>
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Favicon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
          <img
            src={`https://www.google.com/s2/favicons?domain=${getDomain(bookmark.url)}&sz=32`}
            alt=""
            className="w-5 h-5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 font-medium transition-colors duration-200 block truncate"
          >
            {bookmark.title}
          </a>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-500 text-sm truncate">{getDomain(bookmark.url)}</span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-slate-500 text-xs whitespace-nowrap">{timeAgo(bookmark.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        {/* Copy URL button */}
        <button
          onClick={() => navigator.clipboard.writeText(bookmark.url)}
          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-300 p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
          title="Copy URL"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>

        {/* Open in new tab */}
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-300 p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
          title="Open link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {/* Delete button */}
        {showConfirm ? (
          <div className="flex items-center gap-1">
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300 text-xs font-medium px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="text-slate-500 hover:text-slate-300 text-xs font-medium px-2 py-1 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200"
            title="Delete bookmark"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}