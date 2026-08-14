"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  jobDescriptionSchema,
  JobDescriptionFormValues,
} from "@/validators/job-description";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useAnalysisStore } from "@/store/analysisStore";

import { updateApplicationJobDescription } from "@/actions/application.actions";

export default function Step3JobDescription() {
  const nextStep = useAnalysisStore((state) => state.nextStep);

  const previousStep = useAnalysisStore(
    (state) => state.previousStep
  );

  const setJobDescription = useAnalysisStore(
    (state) => state.setJobDescription
  );

  const applicationId = useAnalysisStore(
    (state) => state.applicationId
  );

  const form = useForm<JobDescriptionFormValues>({
    resolver: zodResolver(jobDescriptionSchema),

    defaultValues: {
      jobDescription: "",
    },
  });

  async function onSubmit(values: JobDescriptionFormValues) {
    const response = await updateApplicationJobDescription(
      applicationId,
      values.jobDescription
    );

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setJobDescription(values.jobDescription);

    nextStep();
  }

  const characterCount =
    form.watch("jobDescription")?.length ?? 0;

  return (
    <Card className="page-card analysis-job-card">
      <CardHeader className="analysis-card-header">
        <CardTitle className="analysis-card-title">
          Job Description
        </CardTitle>

        <CardDescription className="analysis-card-description">
          Paste the complete job description below. This will be
          used to compare the requirements with your resume.
        </CardDescription>
      </CardHeader>

      <CardContent className="analysis-card-content">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="analysis-job-form"
          >
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem className="analysis-textarea-wrapper">
                  <FormLabel className="analysis-form-label">
                    Job Description
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={14}
                      placeholder="Paste the complete job description here..."
                      className="analysis-job-textarea"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="analysis-character-row">
              <span>
                {characterCount.toLocaleString()} characters
              </span>
            </div>

            <div className="analysis-actions">
              <Button
                type="button"
                variant="outline"
                onClick={previousStep}
                className="analysis-back-button"
              >
                ← Back
              </Button>

              <Button
                type="submit"
                className="analysis-next-button"
              >
                Next →
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}