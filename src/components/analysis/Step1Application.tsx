"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAnalysisStore } from "@/store/analysisStore";

import {
  ApplicationSchema,
  ApplicationFormValues,
} from "@/validators/application.validator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { createApplication } from "@/actions/application.actions";

import { toast } from "sonner";

export default function Step1Application() {
  const nextStep = useAnalysisStore((state) => state.nextStep);

  const setApplicationId = useAnalysisStore(
    (state) => state.setApplicationId
  );

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(ApplicationSchema),

    defaultValues: {
      company: "",
      jobTitle: "",
      location: "",
      appliedDate: new Date(),
    },
  });

  async function onSubmit(values: ApplicationFormValues) {
    try {
      const application = await createApplication(values);

      if (!application.success) {
        toast.error(application.message);
        return;
      }

      setApplicationId(application.data._id);

      toast.success("Application details saved.");

      nextStep();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong while saving the application."
      );
    }
  }

  return (
    <section className="analysis-application-section">
      {/* Header */}
      <div className="analysis-section-header">
        <div>
          <span className="analysis-section-label">
            STEP 01
          </span>

          <h1 className="analysis-section-title">
            Application Details
          </h1>

          <p className="analysis-section-description">
            Tell us about the job you&apos;re applying for.
            This information will be used to organize your
            resume analysis.
          </p>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="analysis-form"
        >
          {/* Company + Job Title */}
          <div className="analysis-form-grid">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="analysis-label">
                    Company Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Google"
                      className="analysis-input"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="analysis-label">
                    Job Title
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Frontend Developer"
                      className="analysis-input"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location + Applied Date */}
          <div className="analysis-form-grid">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="analysis-label">
                    Location
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Bangalore"
                      className="analysis-input"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="analysis-label">
                Applied Date
              </FormLabel>

              <div className="analysis-date-display">
                {new Date().toLocaleDateString("en-GB")}
              </div>
            </FormItem>
          </div>

          {/* Actions */}
          <div className="analysis-actions">
            <Button
              type="button"
              variant="outline"
              className="analysis-back-button"
              disabled
            >
              ← Back
            </Button>

            <Button
              type="submit"
              className="analysis-next-button"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : "Next →"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}