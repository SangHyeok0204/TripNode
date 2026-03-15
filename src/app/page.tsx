import {
  Hero,
  ProblemComparison,
  KeyFeatures,
  HowItWorks,
  ExampleCourses,
  BrandPhilosophy,
  FinalCTA,
} from "@/components/landing";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemComparison />
      <KeyFeatures />
      <HowItWorks />
      <ExampleCourses />
      <BrandPhilosophy />
      <FinalCTA />
    </main>
  );
}
