import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, FileType } from 'lucide-react';
import {
  REGIONS,
  DEPARTMENTS,
  DOCUMENT_TYPES,
  REGION_LABELS,
  DEPARTMENT_LABELS,
  DOCUMENT_TYPE_LABELS,
  FormData,
  DUMMY_SKILLS,
  ROLES,
  ExportFormat,
} from '@/types';

const generateDummyData = (): FormData[] => {
  const data = [];
  const statuses = ['pending', 'approved', 'rejected'] as const;

  for (let i = 0; i < 40; i++) {
    const firstName = `FirstName${i + 1}`;
    const lastName = `LastName${i + 1}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    const department =
      DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const documentType =
      DOCUMENT_TYPES[Math.floor(Math.random() * DOCUMENT_TYPES.length)];
    const role = ROLES[Math.floor(Math.random() * ROLES.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const numSkills = Math.floor(Math.random() * 4) + 2;
    const shuffledSkills = [...DUMMY_SKILLS].sort(() => 0.5 - Math.random());
    const skills = shuffledSkills.slice(0, numSkills);

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    data.push({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      region,
      department,
      documentType,
      role,
      experience: Math.floor(Math.random() * 15) + 1,
      skills,
      additionalNotes:
        Math.random() > 0.5
          ? `Additional notes for ${firstName} ${lastName}`
          : undefined,
      submittedAt: date.toISOString(),
      status,
      privacyConsent: true,
    });
  }
  return data;
};

const convertToCSV = (data: FormData[]) => {
  const headers = [
    'ID',
    'First Name',
    'Last Name',
    'Email',
    'Region',
    'Department',
    'Document Type',
    'Role',
    'Experience',
    'Skills',
    'Additional Notes',
    'Submitted At',
    'Status',
    'Privacy Consent',
  ];

  const rows = data.map((item) => [
    item.id,
    item.firstName,
    item.lastName,
    item.email,
    REGION_LABELS[item.region as keyof typeof REGION_LABELS],
    DEPARTMENT_LABELS[item.department as keyof typeof DEPARTMENT_LABELS],
    DOCUMENT_TYPE_LABELS[
      item.documentType as keyof typeof DOCUMENT_TYPE_LABELS
    ],
    item.role,
    item.experience,
    item.skills.join('; '),
    item.additionalNotes || '',
    new Date(item.submittedAt).toLocaleString(),
    item.status,
    item.privacyConsent.toString(),
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');
};

const convertToPlainText = (data: FormData[]) => {
  let text = 'Form Data Export\n\n';

  data.forEach((item, index) => {
    text += `Entry #${index + 1}\n`;
    text += `ID: ${item.id}\n`;
    text += `Name: ${item.firstName} ${item.lastName}\n`;
    text += `Email: ${item.email}\n`;
    text += `Region: ${REGION_LABELS[item.region as keyof typeof REGION_LABELS]}\n`;
    text += `Department: ${DEPARTMENT_LABELS[item.department as keyof typeof DEPARTMENT_LABELS]}\n`;
    text += `Document Type: ${DOCUMENT_TYPE_LABELS[item.documentType as keyof typeof DOCUMENT_TYPE_LABELS]}\n`;
    text += `Role: ${item.role}\n`;
    text += `Experience: ${item.experience} years\n`;
    text += `Skills: ${item.skills.join(', ')}\n`;
    if (item.additionalNotes) {
      text += `Additional Notes: ${item.additionalNotes}\n`;
    }
    text += `Submitted At: ${new Date(item.submittedAt).toLocaleString()}\n`;
    text += `Status: ${item.status}\n`;
    text += `Privacy Consent: ${item.privacyConsent}\n`;
    text += '\n';
  });

  return text;
};

const convertToHTML = (data: FormData[]) => {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h1>Form Data Export</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Department</th>
            <th>Document Type</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Skills</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  `;

  data.forEach((item) => {
    html += `
      <tr>
        <td>${item.firstName} ${item.lastName}</td>
        <td>${item.email}</td>
        <td>${REGION_LABELS[item.region as keyof typeof REGION_LABELS]}</td>
        <td>${DEPARTMENT_LABELS[item.department as keyof typeof DEPARTMENT_LABELS]}</td>
        <td>${DOCUMENT_TYPE_LABELS[item.documentType as keyof typeof DOCUMENT_TYPE_LABELS]}</td>
        <td>${item.role}</td>
        <td>${item.experience} years</td>
        <td>${item.skills.join(', ')}</td>
        <td>${item.status}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  return html;
};

const FormDataGenerator = () => {
  const [selectedFormat, setSelectedFormat] =
    React.useState<ExportFormat>('csv');
  const [showAlert, setShowAlert] = React.useState(false);

  const handleDownload = () => {
    const dummyData = generateDummyData();
    let content;
    let mimeType;
    let extension;
    let processedContent;

    try {
      switch (selectedFormat) {
        case 'csv':
          content = convertToCSV(dummyData);
          mimeType = 'text/csv;charset=utf-8;';
          extension = 'csv';
          processedContent = content;
          break;
        case 'txt':
          content = convertToPlainText(dummyData);
          mimeType = 'text/plain;charset=utf-8;';
          extension = 'txt';
          processedContent = content;
          break;
        case 'html':
          content = convertToHTML(dummyData);
          mimeType = 'text/html;charset=utf-8;';
          extension = 'html';
          processedContent = content;
          break;
        default:
          return;
      }

      const blob = new Blob([processedContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `form_data.${extension}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error generating file:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Download Dummy Data</CardTitle>
          <CardDescription>
            Generate and download dummy form data for the JIRA tickets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Select
              value={selectedFormat}
              onValueChange={(value) =>
                setSelectedFormat(value as ExportFormat)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="txt">Text</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleDownload} className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          {showAlert && (
            <Alert className="mt-4">
              <FileType className="h-4 w-4" />
              <AlertDescription>
                File successfully generated and downloaded!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormDataGenerator;
