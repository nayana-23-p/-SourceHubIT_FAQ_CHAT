import { FAQ } from '../types';
import { faqData } from '../data/faq';

export class FAQMatcher {
  private faqs: FAQ[];

  constructor() {
    this.faqs = faqData;
  }

  // Calculate similarity score between query and FAQ
  private calculateScore(query: string, faq: FAQ): number {
    const queryWords = this.tokenize(query.toLowerCase());
    const questionWords = this.tokenize(faq.question.toLowerCase());
    const keywords = faq.keywords.map(k => k.toLowerCase());

    let score = 0;

    // Exact phrase matching (highest weight)
    if (faq.question.toLowerCase().includes(query.toLowerCase())) {
      score += 100;
    }

    // Keyword matching
    queryWords.forEach(word => {
      // Direct keyword match
      if (keywords.includes(word)) {
        score += 20;
      }
      
      // Question word match
      if (questionWords.includes(word)) {
        score += 15;
      }

      // Partial keyword match
      keywords.forEach(keyword => {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 10;
        }
      });

      // Partial question word match
      questionWords.forEach(qWord => {
        if (qWord.includes(word) || word.includes(qWord)) {
          score += 5;
        }
      });
    });

    // Length bonus (prefer shorter questions for similar scores)
    score += Math.max(0, 10 - faq.question.length / 10);

    return score;
  }

  private tokenize(text: string): string[] {
    return text.replace(/[^\w\s]/g, '').split(/\s+/).filter(word => word.length > 2);
  }

  // Find best matching FAQ
  public findBestMatch(query: string): { faq: FAQ; score: number } | null {
    if (!query.trim()) return null;

    const scores = this.faqs.map(faq => ({
      faq,
      score: this.calculateScore(query, faq)
    }));

    scores.sort((a, b) => b.score - a.score);
    
    const bestMatch = scores[0];
    
    // Only return if score is above threshold
    return bestMatch.score > 10 ? bestMatch : null;
  }

  // Find multiple similar questions
  public findSimilarQuestions(query: string, limit: number = 3): FAQ[] {
    if (!query.trim()) return [];

    const scores = this.faqs.map(faq => ({
      faq,
      score: this.calculateScore(query, faq)
    }));

    return scores
      .filter(item => item.score > 5)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.faq);
  }

  // Get random FAQ suggestions
  public getRandomSuggestions(count: number = 3): FAQ[] {
    const shuffled = [...this.faqs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get FAQs by category
  public getFAQsByCategory(category: string): FAQ[] {
    return this.faqs.filter(faq => faq.category === category);
  }
}