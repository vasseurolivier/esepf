'use server';
/**
 * @fileOverview Un flux Genkit pour générer des logos d'institutions éducatives.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLogoInputSchema = z.object({
  schoolName: z.string().describe('Le nom de l\'école pour le logo.'),
  style: z.string().optional().describe('Le style souhaité (ex: moderne, héraldique, minimaliste).'),
});
export type GenerateLogoInput = z.infer<typeof GenerateLogoInputSchema>;

const GenerateLogoOutputSchema = z.object({
  imageUrl: z.string().describe('Le Data URI de l\'image générée.'),
});
export type GenerateLogoOutput = z.infer<typeof GenerateLogoOutputSchema>;

export async function generateLogo(input: GenerateLogoInput): Promise<GenerateLogoOutput> {
  return generateLogoFlow(input);
}

const generateLogoFlow = ai.defineFlow(
  {
    name: 'generateLogoFlow',
    inputSchema: GenerateLogoInputSchema,
    outputSchema: GenerateLogoOutputSchema,
  },
  async (input) => {
    const fullPrompt = `Un logo professionnel et prestigieux pour une institution scolaire nommée "${input.schoolName}". 
    Style: ${input.style || 'moderne et épuré'}. 
    Le logo doit être centré sur un fond blanc pur, avec des couleurs élégantes (bleu marine, or ou rouge). 
    Aura académique, haute résolution, style vectoriel propre.`;

    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: fullPrompt,
    });

    if (!media || !media.url) {
      throw new Error('La génération de l\'image a échoué');
    }

    return { imageUrl: media.url };
  }
);
