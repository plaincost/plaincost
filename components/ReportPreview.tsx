const reportLines = [
  { service: "EC2 compute", amount: "$612.40" },
  { service: "S3 storage", amount: "$284.15" },
  { service: "RDS database", amount: "$198.22" },
];

type ReportPreviewProps = {
  compact?: boolean;
  className?: string;
};

export default function ReportPreview({
  compact = false,
  className = "",
}: ReportPreviewProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg ${className}`}
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 sm:px-5 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Weekly report
            </p>
            <p className="truncate font-semibold text-slate-900">
              PlainCost Insights
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
            Sample
          </span>
        </div>
      </div>

      <div className={`space-y-4 ${compact ? "p-4" : "space-y-5 p-5"}`}>
        <div>
          <p className="text-sm text-slate-500">Week of Jun 23–29</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-2 sm:gap-3">
            <p
              className={`font-bold text-slate-900 ${compact ? "text-2xl" : "text-3xl"}`}
            >
              $1,247.83
            </p>
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 sm:text-sm">
              +12% vs last week
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">Where it went</p>
          <ul className="mt-2 space-y-1.5">
            {reportLines.map((line) => (
              <li
                key={line.service}
                className="flex justify-between gap-3 text-sm text-slate-600"
              >
                <span className="min-w-0 truncate">{line.service}</span>
                <span className="shrink-0 font-medium text-slate-900">
                  {line.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {!compact && (
          <>
            <div className="rounded-lg bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-800">
                In plain English
              </p>
              <p className="mt-1 text-sm leading-relaxed text-brand-900/80">
                Your EC2 costs jumped because two development servers were left
                running over the weekend. Shutting them down outside business
                hours would save about $180/month.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-900">
                Recommendation
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Two t3.large instances are underutilized. Rightsizing to
                t3.medium could save ~$94/month with no performance impact.
              </p>
            </div>
          </>
        )}

        {compact && (
          <div className="rounded-lg bg-brand-50 p-3">
            <p className="text-xs font-medium text-brand-800 sm:text-sm">
              In plain English
            </p>
            <p className="mt-1 text-xs leading-relaxed text-brand-900/80 sm:text-sm">
              EC2 costs jumped — two dev servers ran all weekend. Shut them down
              after hours to save ~$180/month.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}