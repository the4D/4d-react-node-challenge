import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  FormData,
  REGIONS,
  DOCUMENT_TYPES,
  DEPARTMENTS,
  Region,
  Department,
  DocumentType,
  INITIAL_FORM_STATE,
} from '../types';
import { api } from '../services/api';
const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const handleNestedChange = (
    section: keyof Omit<FormData, 'id'>,
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(typeof prev[section] === 'object' ? prev[section] : {}),
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      const response = await api.submitForm(submissionData as FormData);
      console.log('Form submitted:', response);
      navigate('/results');
    } catch (error) {}
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Document Submission Form</CardTitle>
        <CardDescription>
          Submit employee documentation for processing and compliance review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Employee Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName">First Name</label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="employeeId">Employee ID</label>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="ABC-12345"
                  />
                  {errors.employeeId && (
                    <span className="text-red-500 text-sm">
                      {errors.employeeId}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 555-5555"
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="salary">Annual Salary</label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="Enter annual salary"
                  />
                  {errors.salary && (
                    <span className="text-red-500 text-sm">
                      {errors.salary}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="startDate">Start Date</label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  {errors.startDate && (
                    <span className="text-red-500 text-sm">
                      {errors.startDate}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="supervisorEmail">Supervisor Email</label>
                  <Input
                    id="supervisorEmail"
                    name="supervisorEmail"
                    type="email"
                    value={formData.supervisorEmail}
                    onChange={handleInputChange}
                    placeholder="supervisor@the4d.ca"
                  />
                  {errors.supervisorEmail && (
                    <span className="text-red-500 text-sm">
                      {errors.supervisorEmail}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="costCenter">Cost Center</label>
                  <Input
                    id="costCenter"
                    name="costCenter"
                    value={formData.costCenter}
                    onChange={handleInputChange}
                    placeholder="CC-XXX-YYY"
                  />
                  {errors.costCenter && (
                    <span className="text-red-500 text-sm">
                      {errors.costCenter}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="projectCode">Project Code</label>
                <Input
                  id="projectCode"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleInputChange}
                  placeholder="PRJ-2024-001"
                />
                {errors.projectCode && (
                  <span className="text-red-500 text-sm">
                    {errors.projectCode}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Organization Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="region">Region</label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      region: value as Region,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.region && (
                  <span className="text-red-500 text-sm">{errors.region}</span>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="department">Department</label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      department: value as Department,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <span className="text-red-500 text-sm">
                    {errors.department}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Document Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="documentType">Document Type</label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      documentType: value as DocumentType,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCUMENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.documentType && (
                  <span className="text-red-500 text-sm">
                    {errors.documentType}
                  </span>
                )}
              </div>

              {formData.documentType ===
                DOCUMENT_TYPES.find(
                  (type) => type.toLowerCase() === 'training certificate'
                ) && (
                <div className="space-y-2">
                  <label>Relevant Skills</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'React',
                      'TypeScript',
                      'Node.js',
                      'Testing',
                      'API Design',
                    ].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <label htmlFor={`skill-${skill}`}>{skill}</label>
                      </div>
                    ))}
                  </div>
                  {errors.skills && (
                    <span className="text-red-500 text-sm">
                      {errors.skills}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="emergencyContactName">Name</label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    handleNestedChange(
                      'emergencyContact',
                      'name',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="emergencyContactRelationship">
                  Relationship
                </label>
                <Input
                  id="emergencyContactRelationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) =>
                    handleNestedChange(
                      'emergencyContact',
                      'relationship',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Work Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remoteWork"
                  checked={formData.workPreferences.remoteWork}
                  onCheckedChange={(checked) =>
                    handleNestedChange('workPreferences', 'remoteWork', checked)
                  }
                />
                <label htmlFor="remoteWork">Remote Work</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flexibleHours"
                  checked={formData.workPreferences.flexibleHours}
                  onCheckedChange={(checked) =>
                    handleNestedChange(
                      'workPreferences',
                      'flexibleHours',
                      checked
                    )
                  }
                />
                <label htmlFor="flexibleHours">Flexible Hours</label>
              </div>
              <div className="space-y-2">
                <label htmlFor="travelWillingness">Travel Willingness</label>
                <Select
                  value={formData.workPreferences.travelWillingness}
                  onValueChange={(value) =>
                    handleNestedChange(
                      'workPreferences',
                      'travelWillingness',
                      value
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select travel preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No Travel</SelectItem>
                    <SelectItem value="occasional">
                      Occasional Travel
                    </SelectItem>
                    <SelectItem value="frequent">Frequent Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Banking Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="accountHolder">Account Holder Name</label>
                  <Input
                    id="accountHolder"
                    value={formData.bankingInfo.accountHolder}
                    onChange={(e) =>
                      handleNestedChange(
                        'bankingInfo',
                        'accountHolder',
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bankName">Bank Name</label>
                  <Input
                    id="bankName"
                    value={formData.bankingInfo.bankName}
                    onChange={(e) =>
                      handleNestedChange(
                        'bankingInfo',
                        'bankName',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="accountNumber">Account Number</label>
                  <Input
                    id="accountNumber"
                    type="password"
                    value={formData.bankingInfo.accountNumber}
                    onChange={(e) =>
                      handleNestedChange(
                        'bankingInfo',
                        'accountNumber',
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="routingNumber">Routing Number</label>
                  <Input
                    id="routingNumber"
                    type="password"
                    value={formData.bankingInfo.routingNumber}
                    onChange={(e) =>
                      handleNestedChange(
                        'bankingInfo',
                        'routingNumber',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">IT Requirements</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="computerType">Computer Preference</label>
                <Select
                  value={formData.itRequirements.computerType}
                  onValueChange={(value) =>
                    handleNestedChange('itRequirements', 'computerType', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select computer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label>Required Software</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Office 365',
                    'Adobe Creative Suite',
                    'Visual Studio',
                    'Slack',
                    'Zoom',
                  ].map((software) => (
                    <div key={software} className="flex items-center space-x-2">
                      <Checkbox
                        id={`software-${software}`}
                        checked={formData.itRequirements.softwareNeeds.includes(
                          software
                        )}
                        onCheckedChange={(checked) => {
                          const updatedSoftware = checked
                            ? [
                                ...formData.itRequirements.softwareNeeds,
                                software,
                              ]
                            : formData.itRequirements.softwareNeeds.filter(
                                (s) => s !== software
                              );
                          handleNestedChange(
                            'itRequirements',
                            'softwareNeeds',
                            updatedSoftware
                          );
                        }}
                      />
                      <label htmlFor={`software-${software}`}>{software}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="space-y-2">
              <label htmlFor="additionalNotes">Notes</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows={4}
                placeholder="Add any relevant notes or comments about this document"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacyConsent"
                checked={formData.privacyConsent}
                onCheckedChange={(checked) => {
                  setFormData((prev) => ({
                    ...prev,
                    privacyConsent: checked as boolean,
                  }));
                }}
              />
              <label htmlFor="privacyConsent">
                I acknowledge that this document will be processed according to
                regional privacy policies and data protection regulations
              </label>
            </div>
            {errors.privacyConsent && (
              <span className="text-red-500 text-sm">
                {errors.privacyConsent}
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="border border-transparent hover:border-green-500"
            >
              Submit Document
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormPage;
