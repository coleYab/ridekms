'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { KnowledgeHarvestUploader } from './knowledge-harvest-uploader';

interface FormData {
  fullName: string;
  employeeId: string;
  department: string;
  role: string;
  yearsOfService: string;
  lastWorkDate: string;
  reasonForLeaving: string;
  keyKnowledge: string;
  undocumentedProcesses: string;
  adviceForSuccessor: string;
  contactsToShare: string;
  mediaUrl: string;
  checklist: {
    documentsHanded: boolean;
    contactsShared: boolean;
    processesDocumented: boolean;
    trainingProvided: boolean;
    handoverCompleted: boolean;
  };
}

const initialFormData: FormData = {
  fullName: '',
  employeeId: '',
  department: '',
  role: '',
  yearsOfService: '',
  lastWorkDate: '',
  reasonForLeaving: '',
  keyKnowledge: '',
  undocumentedProcesses: '',
  adviceForSuccessor: '',
  contactsToShare: '',
  mediaUrl: '',
  checklist: {
    documentsHanded: false,
    contactsShared: false,
    processesDocumented: false,
    trainingProvided: false,
    handoverCompleted: false
  }
};

const steps = [
  { id: 1, title: 'Contact Info', description: 'Basic information' },
  { id: 2, title: 'Knowledge Summary', description: 'Share your expertise' },
  { id: 3, title: 'Checklist', description: 'Handover tasks' },
  { id: 4, title: 'Review', description: 'Confirm and submit' }
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className='flex items-center justify-center mb-8'>
      {steps.map((step, index) => (
        <div key={step.id} className='flex items-center'>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              currentStep >= step.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted text-muted-foreground border-muted'
            }`}
          >
            {currentStep > step.id ? (
              <Icons.check className='h-5 w-5' />
            ) : (
              <span className='text-sm font-medium'>{step.id}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1ContactInfo({
  data,
  updateData
}: {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}) {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
        <p className='text-sm text-muted-foreground mb-6'>
          Please provide your basic contact information for our records.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Full Name *</label>
          <Input
            placeholder='Enter your full name'
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Employee ID *</label>
          <Input
            placeholder='e.g., EMP-12345'
            value={data.employeeId}
            onChange={(e) => updateData({ employeeId: e.target.value })}
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Department *</label>
          <Input
            placeholder='e.g., Operations, Dispatch'
            value={data.department}
            onChange={(e) => updateData({ department: e.target.value })}
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Role/Position *</label>
          <Input
            placeholder='e.g., Senior Driver, Lead Dispatcher'
            value={data.role}
            onChange={(e) => updateData({ role: e.target.value })}
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Years of Service *</label>
          <Input
            type='number'
            placeholder='e.g., 5'
            value={data.yearsOfService}
            onChange={(e) => updateData({ yearsOfService: e.target.value })}
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Last Work Date *</label>
          <Input
            type='date'
            value={data.lastWorkDate}
            onChange={(e) => updateData({ lastWorkDate: e.target.value })}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Reason for Leaving</label>
        <Textarea
          placeholder='Briefly explain your reason for leaving (optional)...'
          value={data.reasonForLeaving}
          onChange={(e) => updateData({ reasonForLeaving: e.target.value })}
          className='min-h-[100px]'
        />
      </div>
    </div>
  );
}

function Step2KnowledgeSummary({
  data,
  updateData
}: {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}) {
  const handleUploadComplete = (url: string, _fileName: string) => {
    updateData({ mediaUrl: url });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Knowledge Summary</h3>
        <p className='text-sm text-muted-foreground mb-6'>
          Share your valuable knowledge that should be preserved for future staff.
        </p>
      </div>

      <div className='mb-6'>
        <KnowledgeHarvestUploader
          onUploadComplete={handleUploadComplete}
          existingUrl={data.mediaUrl}
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Key Knowledge & Skills *</label>
        <p className='text-xs text-muted-foreground mb-2'>
          What important knowledge, skills, or procedures have you learned that others should know?
        </p>
        <Textarea
          placeholder='Document your key knowledge, special skills, and expertise...'
          value={data.keyKnowledge}
          onChange={(e) => updateData({ keyKnowledge: e.target.value })}
          className='min-h-[150px]'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Undocumented Processes</label>
        <p className='text-xs text-muted-foreground mb-2'>
          Describe any processes or workflows that are not documented but are important.
        </p>
        <Textarea
          placeholder='List undocumented processes that should be captured...'
          value={data.undocumentedProcesses}
          onChange={(e) => updateData({ undocumentedProcesses: e.target.value })}
          className='min-h-[120px]'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Advice for Your Successor</label>
        <p className='text-xs text-muted-foreground mb-2'>
          What advice would you give to the person who takes over your role?
        </p>
        <Textarea
          placeholder='Share tips and advice for your successor...'
          value={data.adviceForSuccessor}
          onChange={(e) => updateData({ adviceForSuccessor: e.target.value })}
          className='min-h-[100px]'
        />
      </div>
    </div>
  );
}

function Step3Checklist({
  data,
  updateData
}: {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}) {
  const updateChecklist = (key: keyof FormData['checklist'], value: boolean) => {
    updateData({
      checklist: { ...data.checklist, [key]: value }
    });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Knowledge Transfer Checklist</h3>
        <p className='text-sm text-muted-foreground mb-6'>
          Please complete the following tasks before your last day.
        </p>
      </div>

      <div className='space-y-3'>
        {[
          {
            key: 'documentsHanded' as const,
            label: 'Documents Handed Over',
            description:
              'All relevant documents, SOPs, and guides have been handed to your supervisor.'
          },
          {
            key: 'contactsShared' as const,
            label: 'Contacts Shared',
            description:
              'Important contacts, partner information, and key stakeholders have been shared.'
          },
          {
            key: 'processesDocumented' as const,
            label: 'Processes Documented',
            description: 'All critical processes and workflows have been documented.'
          },
          {
            key: 'trainingProvided' as const,
            label: 'Training Provided',
            description:
              'Adequate training has been provided to team members who will cover your responsibilities.'
          },
          {
            key: 'handoverCompleted' as const,
            label: 'Handover Complete',
            description:
              'All responsibilities have been formally handed over to designated team members.'
          }
        ].map((item) => (
          <Card
            key={item.key}
            className={`cursor-pointer transition-colors ${
              data.checklist[item.key] ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => updateChecklist(item.key, !data.checklist[item.key])}
          >
            <CardContent className='p-4 flex items-start gap-4'>
              <div
                className={`flex h-6 w-6 items-center justify-center rounded border-2 transition-colors ${
                  data.checklist[item.key]
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted'
                }`}
              >
                {data.checklist[item.key] && <Icons.check className='h-4 w-4' />}
              </div>
              <div>
                <p className='font-medium text-sm'>{item.label}</p>
                <p className='text-xs text-muted-foreground mt-1'>{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='space-y-2 pt-4'>
        <label className='text-sm font-medium'>Additional Contacts to Share</label>
        <Textarea
          placeholder='List any additional contacts, vendors, or partners that should be shared...'
          value={data.contactsToShare}
          onChange={(e) => updateData({ contactsToShare: e.target.value })}
          className='min-h-[100px]'
        />
      </div>
    </div>
  );
}

function Step4Review({ data }: { data: FormData }) {
  const completedChecklist = Object.values(data.checklist).filter(Boolean).length;

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Review Your Submission</h3>
        <p className='text-sm text-muted-foreground mb-6'>
          Please review your information before submitting.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 text-sm'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <span className='text-muted-foreground'>Name:</span> {data.fullName}
            </div>
            <div>
              <span className='text-muted-foreground'>Employee ID:</span> {data.employeeId}
            </div>
            <div>
              <span className='text-muted-foreground'>Department:</span> {data.department}
            </div>
            <div>
              <span className='text-muted-foreground'>Role:</span> {data.role}
            </div>
            <div>
              <span className='text-muted-foreground'>Years of Service:</span> {data.yearsOfService}
            </div>
            <div>
              <span className='text-muted-foreground'>Last Work Date:</span> {data.lastWorkDate}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Checklist Progress</CardTitle>
          <CardDescription>
            {completedChecklist} of {Object.keys(data.checklist).length} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='w-full bg-muted rounded-full h-2'>
            <div
              className='bg-primary h-2 rounded-full transition-all'
              style={{
                width: `${(completedChecklist / Object.keys(data.checklist).length) * 100}%`
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Knowledge Summary</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 text-sm'>
          {data.keyKnowledge && (
            <div>
              <p className='font-medium mb-1'>Key Knowledge:</p>
              <p className='text-muted-foreground whitespace-pre-wrap'>{data.keyKnowledge}</p>
            </div>
          )}
          {data.undocumentedProcesses && (
            <div>
              <p className='font-medium mb-1'>Undocumented Processes:</p>
              <p className='text-muted-foreground whitespace-pre-wrap'>
                {data.undocumentedProcesses}
              </p>
            </div>
          )}
          {data.adviceForSuccessor && (
            <div>
              <p className='font-medium mb-1'>Advice for Successor:</p>
              <p className='text-muted-foreground whitespace-pre-wrap'>{data.adviceForSuccessor}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ExitKnowledgePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName &&
          formData.employeeId &&
          formData.department &&
          formData.role &&
          formData.yearsOfService &&
          formData.lastWorkDate
        );
      case 2:
        return formData.keyKnowledge;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/kms/exit-knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          employeeId: formData.employeeId,
          department: formData.department,
          role: formData.role,
          yearsOfService: formData.yearsOfService,
          lastWorkDate: formData.lastWorkDate,
          reasonForLeaving: formData.reasonForLeaving,
          keyKnowledge: formData.keyKnowledge,
          undocumentedProcesses: formData.undocumentedProcesses,
          adviceForSuccessor: formData.adviceForSuccessor,
          contactsToShare: formData.contactsToShare,
          mediaUrl: formData.mediaUrl,
          checklist: formData.checklist
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      toast.success('Exit Knowledge Capture submitted successfully!');
      router.push('/dashboard/kms');
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full mx-auto'>
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold mb-2'>Exit Knowledge Capture</h1>
        <p className='text-muted-foreground'>
          Help preserve your valuable knowledge before you leave
        </p>
      </div>

      <Card>
        <CardContent className='pt-6'>
          <StepIndicator currentStep={currentStep} />

          <div className='mb-8'>
            {currentStep === 1 && <Step1ContactInfo data={formData} updateData={updateData} />}
            {currentStep === 2 && <Step2KnowledgeSummary data={formData} updateData={updateData} />}
            {currentStep === 3 && <Step3Checklist data={formData} updateData={updateData} />}
            {currentStep === 4 && <Step4Review data={formData} />}
          </div>

          <div className='flex justify-between pt-6 border-t'>
            <Button
              variant='outline'
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              disabled={currentStep === 1}
            >
              <Icons.chevronLeft className='mr-2 h-4 w-4' />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()}>
                Next
                <Icons.chevronRight className='ml-2 h-4 w-4' />
              </Button>
            ) : (
              <Button onClick={handleSubmit} isLoading={isSubmitting}>
                Submit
                <Icons.check className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
