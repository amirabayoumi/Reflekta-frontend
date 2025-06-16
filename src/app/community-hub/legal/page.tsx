/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { Search, Phone, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Legal FAQ - Community Hub | Reflekta",
  description:
    "Find answers to common legal questions related to immigration and residency in Belgium.",
  openGraph: {
    title: "Legal FAQ - Community Hub | Reflekta",
    description:
      "Find answers to common legal questions related to immigration and residency in Belgium.",
    images: [
      {
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/v1749149982/Untitled_design_vrodpv.png",
        width: 1200,
        height: 630,
        alt: "Legal FAQ - Community Hub",
      },
    ],
  },
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  faqs: FAQItem[];
}

const LegalFAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<FAQCategory[]>(
    []
  );
  const [expandedValues, setExpandedValues] = useState<string[]>([]);

  // Sample FAQ data
  const faqCategories: FAQCategory[] = [
    {
      id: "immigration",
      title: "Immigration & Residency",
      faqs: [
        {
          id: "visa",
          question: "What types of visas are available for non-EU citizens?",
          answer:
            "Belgium offers several types of visas including work visas, family reunification, student visas, and asylum. Each type has specific requirements and application processes. For work visas, you generally need a job offer from a Belgian employer. Family reunification allows certain family members to join you in Belgium.",
        },
        {
          id: "residency",
          question: "How do I apply for permanent residency?",
          answer:
            "To apply for permanent residency, you must have legally resided in Belgium for at least 5 years without significant interruptions. You must submit your application at your local municipality office with documentation of your legal stay, proof of integration, and economic self-sufficiency.",
        },
        {
          id: "citizenship",
          question: "What are the requirements for Belgian citizenship?",
          answer:
            "Belgian citizenship can be obtained through naturalization after living legally in Belgium for 5 years, demonstrating integration into Belgian society, knowledge of one of the national languages, and economic participation. There are also options for citizenship through marriage to a Belgian citizen or by birth in Belgium under certain conditions.",
        },
      ],
    },
    {
      id: "work",
      title: "Work & Employment Rights",
      faqs: [
        {
          id: "contract",
          question: "What should be included in my employment contract?",
          answer:
            "A Belgian employment contract must include the identity of both parties, start date and duration (if temporary), job location, job description, working hours, salary and benefits, notice periods, and any applicable collective bargaining agreements. It should be in one of Belgium's official languages.",
        },
        {
          id: "termination",
          question: "What are my rights if my employment is terminated?",
          answer:
            "If your employment is terminated, you are entitled to a notice period or payment in lieu, based on your length of service. An employer must provide justifiable reasons for dismissal. In cases of wrongful termination, you may be able to claim additional compensation. You may also be entitled to unemployment benefits if certain conditions are met.",
        },
        {
          id: "discrimination",
          question: "How am I protected against workplace discrimination?",
          answer:
            "Belgian law prohibits discrimination based on nationality, race, color, ancestry, national or ethnic origin, gender, sexual orientation, civil status, birth, age, religion, political opinion, language, health condition, disability, or physical characteristics. If you experience discrimination, you can file a complaint with the Interfederal Centre for Equal Opportunities (Unia) or take legal action.",
        },
      ],
    },
    {
      id: "housing",
      title: "Housing & Tenancy Rights",
      faqs: [
        {
          id: "lease",
          question: "What should I know about rental agreements in Belgium?",
          answer:
            "Rental agreements in Belgium should be in writing and include the property description, monthly rent amount, duration of the lease, conditions for rent increases, and deposit information. Standard residential leases are typically for 9 years, but shorter-term contracts are possible. The lease must be registered with the local Registration Office within 2 months of signing.",
        },
        {
          id: "deposit",
          question: "How does the rental deposit system work?",
          answer:
            "In Belgium, the maximum rental deposit is 2 months' rent. This deposit must be placed in a blocked bank account in the tenant's name. Neither the landlord nor the tenant can access the deposit without the other's agreement. At the end of the tenancy, the deposit is returned to the tenant minus any justified deductions for damages beyond normal wear and tear.",
        },
        {
          id: "repairs",
          question: "Who is responsible for repairs in a rental property?",
          answer:
            "Generally, the landlord is responsible for major repairs and structural maintenance, while tenants are responsible for small repairs and day-to-day maintenance. The tenant must report any major issues promptly. Specific responsibilities should be outlined in the rental agreement, but Belgian law provides default rules for situations not covered in the contract.",
        },
      ],
    },
    {
      id: "education",
      title: "Education & Language Rights",
      faqs: [
        {
          id: "language",
          question: "What language services can I access as a newcomer?",
          answer:
            "As a newcomer to Belgium, you can access free or subsidized language courses in Dutch, French, or German depending on the region where you live. Integration programs often include language training. Translation and interpretation services are available for important administrative and medical interactions. Some municipalities also offer language buddy programs.",
        },
        {
          id: "school",
          question: "How do I enroll my children in local schools?",
          answer:
            "Education is compulsory for all children aged 6-18 in Belgium. To enroll your child, contact the school directly or visit your local municipal education department. You'll need identification documents, proof of residency, and previous school records. Public education is free, though some schools may charge small fees for materials and activities.",
        },
        {
          id: "recognition",
          question:
            "How can I get my foreign qualifications recognized in Belgium?",
          answer:
            "The process for recognizing foreign qualifications depends on the purpose and level of education. For higher education diplomas, contact NARIC (National Academic Recognition Information Centre) in the appropriate linguistic community. For professional qualifications, you may need to contact the relevant professional regulatory body. The process typically involves submitting authenticated copies of diplomas, transcripts, and sometimes additional examinations.",
        },
      ],
    },
  ];

  // Simplify the filtering process
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(faqCategories);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = faqCategories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(lowerCaseQuery) ||
            faq.answer.toLowerCase().includes(lowerCaseQuery)
        ),
      }))
      .filter((category) => category.faqs.length > 0);

    setFilteredCategories(filtered);

    // Auto-expand categories with matching FAQs
    setExpandedValues(filtered.map((cat) => cat.id));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search legal questions..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Accordion using Shadcn UI */}
        <div className="space-y-6 mb-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Accordion
                  type="single"
                  collapsible
                  value={
                    expandedValues.includes(category.id)
                      ? category.id
                      : undefined
                  }
                  onValueChange={(value) => {
                    if (value) {
                      // Add to expanded values if not already there
                      setExpandedValues((prev) =>
                        prev.includes(category.id)
                          ? prev
                          : [...prev, category.id]
                      );
                    } else {
                      // Remove from expanded values
                      setExpandedValues((prev) =>
                        prev.filter((id) => id !== category.id)
                      );
                    }
                  }}
                >
                  <AccordionItem value={category.id} className="border-0">
                    <AccordionTrigger className="p-6 text-xl font-medium text-[#553a5c] bg-[#553a5c]/5 hover:bg-[#553a5c]/10 hover:no-underline">
                      {category.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-6 border-t border-gray-200">
                        {category.faqs.map((faq) => (
                          <div key={faq.id} className="mb-8 last:mb-0">
                            <h3 className="font-medium text-lg mb-2 text-gray-900">
                              {faq.question}
                            </h3>
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">
                No results match your search
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#553a5c] hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Legal Assistance Contact Box */}
        <div className="bg-[#553a5c] text-white rounded-lg shadow-md p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-4">
              Need More Legal Assistance?
            </h2>
            <p className="mb-6">
              If you need personalized legal help or have complex questions,
              please contact our legal support team or visit during consultation
              hours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <Phone className="mx-auto mb-4" />
                <h3 className="font-medium mb-2">Legal Helpline</h3>
                <p className="text-white/80">+32 2 123 4567</p>
                <p className="text-white/80 text-sm">Mon-Fri: 9:00 - 17:00</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <Mail className="mx-auto mb-4" />
                <h3 className="font-medium mb-2">Email Support</h3>
                <p className="text-white/80">legal-help@reflekta.be</p>
                <p className="text-white/80 text-sm">
                  Response within 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFAQPage;
