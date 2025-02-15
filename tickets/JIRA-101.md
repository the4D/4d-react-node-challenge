## TITLE: Enhanced Form Validation Engine
**Priority:** Medium

**Component:** Form Page

**Description:**
Create a comprehensive form validation system that ensures data integrity and provides immediate feedback.

**Technical Requirements**

1. Core Validation Framework

- Implement a validation engine that supports:
- Required field validation
- Format validation
- Cross-field validation
- Custom validation rules
- Immediate feedback
- Error message display

2. Field-Specific Validation Rules

Employee Information

- **First Name**: Required, letters only, 2-50 characters
- **Last Name**: Required, letters only, 2-50 characters
- **Email**: Required, valid email format (must include '@' and the4d.ca)
- **Employee ID**: Required, format: "ABC-12345"
- **Phone Number**: Required, format: "+1 (555) 555-5555"

Financial Information

- **Salary**: Required, number > 0, maximum 50,000
- **Cost Center**: Required, format: "CC-XXX-YYY"
- **Project Code**: Required, format: "PRJ-2024-001"

Dates and Time

- **Start Date**: Required, must be a valid date, not in the past, must be a business day

Contact and Supervision

- **Supervisor Email**: Required, valid email format
- **Emergency Contact**:
- Name: Required, 2-50 characters
- Relationship: Required, 2-50 characters

Organization Details

- **Region**: Required, must be second value from REGIONS array
- **Department**: Required, must be second value from DEPARTMENTS array
- **Document Type**: Required, must be second value from DOCUMENT_TYPES array

Banking Information

- **Account Holder**: Required, matches name format
- **Bank Name**: Required, 2-50 characters
- **Account Number**: Required, numeric, exactly 10 digits, starts with 'AB' ends with '21'
- **Routing Number**: Required, numeric, exactly 9 digits, starts with '9' and ends with '9'.

IT Requirements

- **Computer Type**: Required, must be 'Desktop'
- **Software Needs**: At least one selection required

Additional Details

- **Additional Notes**: Optional, max 100 characters
- **Privacy Consent**: Required, must be true

3. Implementation Requirements

```typescript
const validationRules = {
firstName: {
  required: true,
  pattern: /^[A-Za-z]{2,10}$/,
  message: 'First name must be 2-10 letters only'
},
};
```

4. Error Handling Requirements

- Display field-level errors immediately below each field
- Show error messages in red text
- Prevent form submission if any errors exist
- Clear errors when field is corrected

Acceptance Criteria

1. ALL fields must have appropriate validation rules implemented
2. Validation must occur on:

- Form submission
- Value change (clear errors only)

1. Error messages must be specific and helpful
2. Form submission must be blocked if any validation errors exist
3. All dropdown fields must only accept their second value as valid
4. All placeholder formats must be strictly followed (if exists)
5. Cross-field validations must be implemented where relevant
6. Code must be clean, typed, and maintainable
