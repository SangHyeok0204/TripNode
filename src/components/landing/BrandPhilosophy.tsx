import { SectionWrapper } from "@/components/ui";

export function BrandPhilosophy() {
  return (
    <SectionWrapper background="gray">
      <div className="max-w-3xl mx-auto text-center">
        {/* Quote mark */}
        <div className="text-primary-200 mb-6">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Philosophy text */}
        <blockquote className="text-2xl sm:text-3xl font-medium text-gray-800 leading-relaxed mb-8">
          TripNode는 여행을 대신 결정해주지 않습니다.
          <br />
          <span className="text-primary-600">직접 설계하는 과정</span>을 더 직관적이고
          <br />
          즐겁게 만들어주는 서비스입니다.
        </blockquote>

        {/* Separator */}
        <div className="w-16 h-1 bg-primary-300 mx-auto mb-8 rounded-full" />

        {/* Supporting values */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400" />
            복잡한 정보보다 실행 가능한 선택
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400" />
            검색보다 결정
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400" />
            텍스트보다 시각적 이해
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
