import { FileDown, Loader2 } from "lucide-react";
import Table from "@/components/dashboard/tables/Table";
import { TableColumn } from "@/types/interface/dashboard";
import { OverviewTabProps } from "@/types/interface/report";
import { useReportData } from "@/hooks/retreats/use-report-data";
import { DailyAttendanceItem, SessionDetailsItem } from "@/types";

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

  type ReportSummary = {
    category: string;
    count: number;
    percentage: number | string;
  };

  type AverageAttendance = {
    category: string;
    average: number;
    isBold?: boolean;
  };

  const registrationSummaryData: ReportSummary[] = [
    {
      category: "Total Registrations",
      count: reportData.registrationSummary.total,
      percentage: "100%",
    },
    {
      category: "Male",
      count: reportData.registrationSummary.male,
      percentage: `${reportData.registrationSummary.malePercentage}%`,
    },
    {
      category: "Female",
      count: reportData.registrationSummary.female,
      percentage: `${reportData.registrationSummary.femalePercentage}%`,
    },
  ];

  const summaryColumns: TableColumn<ReportSummary>[] = [
    { key: "category", label: "Category" },
    { key: "count", label: "Count" },
    { key: "percentage", label: "Percentage" },
  ];

  const categoryColumns: TableColumn<
    (typeof reportData.categoryBreakdown)[0]
  >[] = [
    { key: "category", label: "Category" },
    { key: "count", label: "Count" },
    {
      key: "percentage",
      label: "Percentage",
      render: (value: unknown) => `${value}%`,
    },
  ];

  const nationalityColumns: TableColumn<
    (typeof reportData.nationalityBreakdown)[0]
  >[] = [
    { key: "nationality", label: "Nationality" },
    { key: "count", label: "Count" },
    {
      key: "percentage",
      label: "Percentage",
      render: (value: unknown) => `${value}%`,
    },
  ];

  const locationColumns: TableColumn<
    (typeof reportData.locationBreakdown)[0]
  >[] = [
    { key: "location", label: "Location" },
    { key: "count", label: "Count" },
    {
      key: "percentage",
      label: "Percentage",
      render: (value: unknown) => `${value}%`,
    },
  ];

  const typeColumns: TableColumn<(typeof reportData.typeBreakdown)[0]>[] = [
    { key: "type", label: "Type" },
    { key: "count", label: "Count" },
    {
      key: "percentage",
      label: "Percentage",
      render: (value: unknown) => `${value}%`,
    },
  ];

  const dailyRegistrationColumns: TableColumn<
    (typeof reportData.dailyRegistrations)[0]
  >[] = [
    {
      key: "day",
      label: "Day",
      render: (value: unknown) => `Day ${value}`,
    },
    { key: "adult", label: "Adult" },
    { key: "youth", label: "Youth" },
    { key: "campus", label: "Campus" },
    { key: "children", label: "Children" },
    {
      key: "total",
      label: "Total",
      render: (value: unknown) => (
        <span className="font-bold">{value as number}</span>
      ),
    },
  ];

  const dailyAttendanceColumns: TableColumn<DailyAttendanceItem>[] = [
    {
      key: "day",
      label: "Day",
      render: (value: unknown) => `Day ${value}`,
    },
    { key: "date", label: "Date" },
    { key: "adult", label: "Adult" },
    { key: "youth", label: "Youth" },
    { key: "campus", label: "Campus" },
    { key: "children", label: "Children" },
    {
      key: "total",
      label: "Total",
      render: (value: unknown) => (
        <span className="font-bold">{value as number}</span>
      ),
    },
  ];

  const averageAttendanceData: AverageAttendance[] = reportData.attendanceData
    ? [
        {
          category: "Adult",
          average: reportData.attendanceData.averageAttendance.adult,
        },
        {
          category: "Youth",
          average: reportData.attendanceData.averageAttendance.youth,
        },
        {
          category: "Campus",
          average: reportData.attendanceData.averageAttendance.campus,
        },
        {
          category: "Children",
          average: reportData.attendanceData.averageAttendance.children,
        },
        {
          category: "Total",
          average: reportData.attendanceData.averageAttendance.total,
          isBold: true,
        },
      ]
    : [];

  const averageAttendanceColumns: TableColumn<AverageAttendance>[] = [
    {
      key: "category",
      label: "Category",
      render: (value: unknown, row: AverageAttendance) => (
        <span className={row.isBold ? "font-bold" : ""}>{value as string}</span>
      ),
    },
    {
      key: "average",
      label: "Average Attendance",
      render: (value: unknown, row: AverageAttendance) => (
        <span className={row.isBold ? "font-bold" : ""}>{value as number}</span>
      ),
    },
  ];

  const sessionDetailsColumns: TableColumn<SessionDetailsItem>[] = [
    {
      key: "day",
      label: "Day",
      render: (value: unknown) => `Day ${value}`,
    },
    { key: "sessionName", label: "Session Name" },
    {
      key: "sessionTime",
      label: "Time",
      render: (value: unknown) => (
        <span className="text-sm">{value as string}</span>
      ),
    },
    { key: "category", label: "Category" },
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    {
      key: "total",
      label: "Total",
      render: (value: unknown) => (
        <span className="font-bold">{value as number}</span>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold uppercase text-navy dark:text-white mb-2">
            Retreat Overview & Report
          </h2>
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
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
          Registration Summary
        </h3>
        <Table
          columns={summaryColumns}
          data={registrationSummaryData}
          emptyMessage="No registration data"
        />
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Category
        </h3>
        <Table
          columns={categoryColumns}
          data={reportData.categoryBreakdown}
          emptyMessage="No category data"
        />
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Nationality
        </h3>
        <Table
          columns={nationalityColumns}
          data={reportData.nationalityBreakdown}
          emptyMessage="No nationality data"
        />
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Location
        </h3>
        <Table
          columns={locationColumns}
          data={reportData.locationBreakdown}
          emptyMessage="No location data"
        />
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
          Registration by Type
        </h3>
        <Table
          columns={typeColumns}
          data={reportData.typeBreakdown}
          emptyMessage="No type data"
        />
      </div>

      <div className="bg-white dark:bg-navy/50 rounded-lg">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
          Daily Registration Analysis
        </h3>
        <Table
          columns={dailyRegistrationColumns}
          data={reportData.dailyRegistrations}
          emptyMessage="No daily registration data"
        />
      </div>

      {reportData.attendanceData && (
        <>
          <div className="bg-white dark:bg-navy/50 rounded-lg">
            <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
              Daily Attendance Analysis
            </h3>
            <Table
              columns={dailyAttendanceColumns}
              data={reportData.attendanceData.dailyAttendance}
              emptyMessage="No daily attendance data"
            />
          </div>

          <div className="bg-white dark:bg-navy/50 rounded-lg">
            <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
              Average Attendance
            </h3>
            <Table
              columns={averageAttendanceColumns}
              data={averageAttendanceData}
              emptyMessage="No average attendance data"
            />
          </div>

          {reportData.attendanceData.sessionDetails.length > 0 && (
            <div className="bg-white dark:bg-navy/50 rounded-lg">
              <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-4">
                Session Attendance Details
              </h3>
              <Table
                columns={sessionDetailsColumns}
                data={reportData.attendanceData.sessionDetails}
                emptyMessage="No session details"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OverviewTab;
