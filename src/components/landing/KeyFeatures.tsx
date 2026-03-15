import { SectionWrapper } from "@/components/ui";
import { NodeMarker, RecommendSpot } from "@/components/mock";

const features = [
  {
    title: "지도 위에 직접 배치",
    description: "가고 싶은 장소를 노드처럼 추가하고 자유롭게 배치하세요",
    icon: "map",
    mockElement: "nodes",
  },
  {
    title: "경로를 눈으로 비교",
    description: "여러 루트 중 가장 효율적인 동선을 직관적으로 확인하세요",
    icon: "route",
    mockElement: "routes",
  },
  {
    title: "혼행에 맞춘 빠른 설계",
    description: "당일치기부터 짧은 여행까지, 부담 없이 빠르게 계획하세요",
    icon: "clock",
    mockElement: "speed",
  },
];

function FeatureIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    map: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    route: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    clock: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return icons[type] || null;
}

function FeatureMock({ type }: { type: string }) {
  if (type === "nodes") {
    return (
      <div className="relative h-24 flex items-center justify-center gap-4">
        <NodeMarker label="1" size="lg" />
        <div className="w-8 h-0.5 bg-primary-300 rounded" />
        <RecommendSpot size="md" pulse />
        <div className="w-8 h-0.5 bg-primary-300 rounded" />
        <NodeMarker label="2" size="lg" />
      </div>
    );
  }

  if (type === "routes") {
    return (
      <div className="relative h-24 flex items-center justify-center">
        <div className="relative w-32 h-16">
          {/* Multiple route options */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary-400 rounded" />
          <div
            className="absolute top-4 left-0 right-0 h-0.5 bg-primary-300 rounded"
            style={{ transform: "scaleX(0.9)" }}
          />
          <div
            className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300 rounded"
            style={{ transform: "scaleX(1.1)" }}
          />
          {/* Best route indicator */}
          <div className="absolute -top-2 right-0 px-1.5 py-0.5 bg-primary-500 text-white text-xs rounded">
            최적
          </div>
        </div>
      </div>
    );
  }

  if (type === "speed") {
    return (
      <div className="relative h-24 flex items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <span className="text-lg">📍</span>
          </div>
          <span className="text-xs text-gray-500">4곳</span>
        </div>
        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
          <span className="text-xs text-gray-500">완성!</span>
        </div>
      </div>
    );
  }

  return null;
}

export function KeyFeatures() {
  return (
    <SectionWrapper background="white">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          TripNode만의 차별점
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          복잡한 여행 계획을 직관적인 지도 경험으로
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
              <FeatureIcon type={feature.icon} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-6">{feature.description}</p>

            {/* Mini Mock */}
            <div className="bg-gray-50 rounded-xl p-4">
              <FeatureMock type={feature.mockElement} />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
