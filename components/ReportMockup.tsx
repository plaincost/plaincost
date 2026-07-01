import ReportPreview from "@/components/ReportPreview";

type ReportMockupProps = {
  compact?: boolean;
  className?: string;
};

export default function ReportMockup({
  compact = false,
  className = "",
}: ReportMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-brand-100/60 to-slate-200/40 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-2xl ring-1 ring-slate-900/5">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="ml-2 truncate text-xs text-slate-500">
            Weekly AWS cost report
          </span>
        </div>
        <ReportPreview compact={compact} className="rounded-none border-0 shadow-none" />
      </div>
    </div>
  );
}