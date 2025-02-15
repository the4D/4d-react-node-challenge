import React, { useEffect, useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Download, Import } from 'lucide-react';
import { api } from '../services/api';
import {
  FormData,
  Region,
  Department,
  DocumentType,
  REGIONS,
  DEPARTMENTS,
  DOCUMENT_TYPES,
  REGION_LABELS,
  DEPARTMENT_LABELS,
  DOCUMENT_TYPE_LABELS,
} from '../types';

interface Filters {
  region: string;
  department: string;
  documentType: string;
}

const ResultsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    region: 'all',
    department: 'all',
    documentType: 'all',
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      try {
        const data = await api.getSubmissions();
        setSubmissions(data);
        setError(null);
      } catch (err) {
        console.error('ResultsPage: Error fetching documents', err);
        setError('Failed to retrieve documents. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const filterOptions = useMemo(
    () => ({
      regions: [
        { value: 'all', label: 'All Regions' },
        ...REGIONS.map((region) => ({
          value: region,
          label: REGION_LABELS[region],
        })),
      ],
      departments: [
        { value: 'all', label: 'All Departments' },
        ...DEPARTMENTS.map((dept) => ({
          value: dept,
          label: DEPARTMENT_LABELS[dept],
        })),
      ],
      documentTypes: [
        { value: 'all', label: 'All Document Types' },
        ...DOCUMENT_TYPES.map((type) => ({
          value: type,
          label: DOCUMENT_TYPE_LABELS[type],
        })),
      ],
    }),
    []
  );

  const filteredData = useMemo(() => {
    return submissions.filter((item) => {
      const searchMatch =
        !searchTerm ||
        `${item.firstName} ${item.lastName}`.toLowerCase() ===
          searchTerm.toLowerCase();
      const regionMatch =
        filters.region === 'all' || item.region === filters.region;
      const departmentMatch =
        filters.department === 'all' || item.department === filters.department;
      const documentMatch =
        filters.documentType === 'all' ||
        item.documentType === filters.documentType;

      return searchMatch && regionMatch && departmentMatch && documentMatch;
    });
  }, [submissions, searchTerm, filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    // Challenge 2
    console.log('Exporting filtered documents:', filteredData);
  };

  const handleImplort = () => {
    // Challenge 2
    console.log('Importing filtered documents:');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Document Management System</CardTitle>
        <CardDescription>
          View and manage employee documentation across all regions
        </CardDescription>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1">
            <Input
              placeholder="Search by exact name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select
              value={filters.region}
              onValueChange={(value) => handleFilterChange('region', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Region" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.regions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.department}
              onValueChange={(value) => handleFilterChange('department', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.departments.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.documentType}
              onValueChange={(value) =>
                handleFilterChange('documentType', value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Document Type" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.documentTypes.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>

            <Button variant="outline" className="gap-2" onClick={handleImplort}>
              <Import className="h-4 w-4" />
              Import
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-24 text-gray-500"
                  >
                    {searchTerm ||
                    Object.values(filters).some((v) => v !== 'all')
                      ? 'No matching documents found'
                      : 'No documents submitted yet'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {submission.firstName} {submission.lastName}
                    </TableCell>
                    <TableCell>
                      {
                        DOCUMENT_TYPE_LABELS[
                          submission.documentType as DocumentType
                        ]
                      }
                    </TableCell>
                    <TableCell>
                      {DEPARTMENT_LABELS[submission.department as Department]}
                    </TableCell>
                    <TableCell>
                      {REGION_LABELS[submission.region as Region]}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          submission.status === 'approved'
                            ? 'text-green-600'
                            : submission.status === 'rejected'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                        }`}
                      >
                        {submission.status.toUpperCase()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPage;
