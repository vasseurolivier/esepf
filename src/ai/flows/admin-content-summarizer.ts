'use server';
/**
 * @fileOverview An AI-powered tool to automatically generate concise summaries or engaging extracts for content.
 *
 * - adminContentSummarizer - A function that handles the content summarization process.
 * - AdminContentSummarizerInput - The input type for the adminContentSummarizer function.
 * - AdminContentSummarizerOutput - The return type for the adminContentSummarizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminContentSummarizerInputSchema = z.object({
  text: z.string().describe('The content to be summarized or extracted.'),
});
export type AdminContentSummarizerInput = z.infer<
  typeof AdminContentSummarizerInputSchema
>;

const AdminContentSummarizerOutputSchema = z.object({
  summary: z.string().describe('The concise summary or engaging extract.'),
});
export type AdminContentSummarizerOutput = z.infer<
  typeof AdminContentSummarizerOutputSchema
>;

export async function adminContentSummarizer(
  input: AdminContentSummarizerInput
): Promise<AdminContentSummarizerOutput> {
  return adminContentSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminContentSummarizerPrompt',
  input: {schema: AdminContentSummarizerInputSchema},
  output: {schema: AdminContentSummarizerOutputSchema},
  prompt: `As an expert content editor for a professional website, your task is to create a concise and engaging summary or extract from the provided text.

The summary should be suitable for displaying as a news article preview or a program description, maintaining a consistent, professional, and informative tone.

Text to summarize:

---
{{{text}}}
---`,
});

const adminContentSummarizerFlow = ai.defineFlow(
  {
    name: 'adminContentSummarizerFlow',
    inputSchema: AdminContentSummarizerInputSchema,
    outputSchema: AdminContentSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
