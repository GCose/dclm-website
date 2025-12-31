import { FileDown, Loader2 } from "lucide-react";
import { OverviewTabProps } from "@/types/interface/report";
import { useReportData } from "@/hooks/retreats/use-report-data";
import { getDateRange } from "@/utils/retreats/report-helpers";

const OverviewTab = ({
  retreat,
  onGeneratePDF,
  generatingPDF,
}: OverviewTabProps) => {
  const { reportData, loading } = useReportData({
    retreatId: retreat._id,
    year: retreat.year,
    type: retreat.type,
    dateFrom: retreat.dateFrom,
    dateTo: retreat.dateTo,
    venue: retreat.venue,
    theme: retreat.theme,
    totalDays: retreat.totalDays,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-navy dark:text-white" size={40} />
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="text-center py-20 text-black/60 dark:text-white/60">
        Failed to load report data
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold uppercase text-navy dark:text-white mb-2">
            Retreat Report
          </h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            {getDateRange(retreat.dateFrom, retreat.dateTo)} • {retreat.venue}
          </p>
          {retreat.theme && (
            <p className="text-sm text-black/60 dark:text-white/60 mt-1">
              Theme: {retreat.theme}
            </p>
          )}
        </div>
        <button
          onClick={onGeneratePDF}
          disabled={generatingPDF}
          className="flex items-center gap-2 px-4 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generatingPDF ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileDown size={16} />
              Generate PDF
            </>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
          Registration Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/5">
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Count
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/10 dark:border-white/20">
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  Total Registrations
                </td>
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  {reportData.registrationSummary.total}
                </td>
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  100%
                </td>
              </tr>
              <tr className="border-b border-black/10 dark:border-white/20">
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  Male
                </td>
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  {reportData.registrationSummary.male}
                </td>
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  {reportData.registrationSummary.malePercentage}%
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  Female
                </td>
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  {reportData.registrationSummary.female}
                </td>
                <td className="py-4 px-6 text-black/70 dark:text-white/70">
                  {reportData.registrationSummary.femalePercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Category
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/5">
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Count
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.categoryBreakdown.map((item, index) => (
                <tr
                  key={item.category}
                  className={
                    index < reportData.categoryBreakdown.length - 1
                      ? "border-b border-black/10 dark:border-white/20"
                      : ""
                  }
                >
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.category}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.count}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Nationality
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/5">
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Nationality
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Count
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.nationalityBreakdown.map((item, index) => (
                <tr
                  key={item.nationality}
                  className={
                    index < reportData.nationalityBreakdown.length - 1
                      ? "border-b border-black/10 dark:border-white/20"
                      : ""
                  }
                >
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.nationality}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.count}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Location
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/5">
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Location
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Count
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.locationBreakdown.map((item, index) => (
                <tr
                  key={item.location}
                  className={
                    index < reportData.locationBreakdown.length - 1
                      ? "border-b border-black/10 dark:border-white/20"
                      : ""
                  }
                >
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.location}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.count}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Type
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/5">
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Type
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Count
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.typeBreakdown.map((item, index) => (
                <tr
                  key={item.type}
                  className={
                    index < reportData.typeBreakdown.length - 1
                      ? "border-b border-black/10 dark:border-white/20"
                      : ""
                  }
                >
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.type}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.count}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
          Daily Registration Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/5">
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Day
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Adult
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Youth
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Campus
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Children
                </th>
                <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.dailyRegistrations.map((item, index) => (
                <tr
                  key={item.day}
                  className={
                    index < reportData.dailyRegistrations.length - 1
                      ? "border-b border-black/10 dark:border-white/20"
                      : ""
                  }
                >
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    Day {item.day}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.adult}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.youth}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.campus}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70">
                    {item.children}
                  </td>
                  <td className="py-4 px-6 text-black/70 dark:text-white/70 font-bold">
                    {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reportData.attendanceData && (
        <>
          <div className="bg-white dark:bg-navy/50 rounded-lg">
            <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
              Daily Attendance Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-white/5">
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Day
                    </th>
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Adult
                    </th>
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Youth
                    </th>
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Campus
                    </th>
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Children
                    </th>
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.attendanceData.dailyAttendance.map(
                    (item, index) => (
                      <tr
                        key={item.day}
                        className={
                          index <
                          reportData.attendanceData!.dailyAttendance.length - 1
                            ? "border-b border-black/10 dark:border-white/20"
                            : ""
                        }
                      >
                        <td className="py-4 px-6 text-black/70 dark:text-white/70">
                          Day {item.day}
                        </td>
                        <td className="py-4 px-6 text-black/70 dark:text-white/70">
                          {item.date}
                        </td>
                        <td className="py-4 px-6 text-black/70 dark:text-white/70">
                          {item.adult}
                        </td>
                        <td className="py-4 px-6 text-black/70 dark:text-white/70">
                          {item.youth}
                        </td>
                        <td className="py-4 px-6 text-black/70 dark:text-white/70">
                          {item.campus}
                        </td>
                        <td className="py-4 px-6 text-black/70 dark:text-white/70">
                          {item.children}
                        </td>
                        <td className="py-4 px-6 text-black/70 dark:text-white/70 font-bold">
                          {item.total}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-navy/50 rounded-lg">
            <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
              Average Attendance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-white/5">
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                      Average Attendance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/10 dark:border-white/20">
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      Adult
                    </td>
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      {reportData.attendanceData.averageAttendance.adult}
                    </td>
                  </tr>
                  <tr className="border-b border-black/10 dark:border-white/20">
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      Youth
                    </td>
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      {reportData.attendanceData.averageAttendance.youth}
                    </td>
                  </tr>
                  <tr className="border-b border-black/10 dark:border-white/20">
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      Campus
                    </td>
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      {reportData.attendanceData.averageAttendance.campus}
                    </td>
                  </tr>
                  <tr className="border-b border-black/10 dark:border-white/20">
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      Children
                    </td>
                    <td className="py-4 px-6 text-black/70 dark:text-white/70">
                      {reportData.attendanceData.averageAttendance.children}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-black/70 dark:text-white/70 font-bold">
                      Total
                    </td>
                    <td className="py-4 px-6 text-black/70 dark:text-white/70 font-bold">
                      {reportData.attendanceData.averageAttendance.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {reportData.attendanceData.sessionDetails.length > 0 && (
            <div className="bg-white dark:bg-navy/50 rounded-lg">
              <h3 className="text-sm font-bold uppercase text-navy dark:text-white mb-4">
                Session Attendance Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-white/5">
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Day
                      </th>
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Session
                      </th>
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Name
                      </th>
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Time
                      </th>
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Category
                      </th>
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Male
                      </th>
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Female
                      </th>
                      <th className="text-left py-4 px-6 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.attendanceData.sessionDetails.map(
                      (item, index) => (
                        <tr
                          key={`${item.day}-${item.sessionNumber}-${item.category}`}
                          className={
                            index <
                            reportData.attendanceData!.sessionDetails.length - 1
                              ? "border-b border-black/10 dark:border-white/20"
                              : ""
                          }
                        >
                          <td className="py-4 px-6 text-black/70 dark:text-white/70">
                            Day {item.day}
                          </td>
                          <td className="py-4 px-6 text-black/70 dark:text-white/70">
                            {item.sessionNumber}
                          </td>
                          <td className="py-4 px-6 text-black/70 dark:text-white/70">
                            {item.sessionName}
                          </td>
                          <td className="py-4 px-6 text-black/70 dark:text-white/70 text-sm">
                            {item.sessionTime}
                          </td>
                          <td className="py-4 px-6 text-black/70 dark:text-white/70">
                            {item.category}
                          </td>
                          <td className="py-4 px-6 text-black/70 dark:text-white/70">
                            {item.male}
                          </td>
                          <td className="py-4 px-6 text-black/70 dark:text-white/70">
                            {item.female}
                          </td>
                          <td className="py-4 px-6 text-black/70 dark:text-white/70 font-bold">
                            {item.total}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OverviewTab;
