import { SectionWrapper } from "@/components/ui";
import { NodeMarker, RecommendSpot } from "@/components/mock";

const courses = [
  {
    title: "서울 당일치기 혼행",
    duration: "4시간",
    spots: 5,
    tags: ["도심", "카페", "산책"],
    color: "blue",
  },
  {
    title: "부산 감성 코스",
    duration: "1박 2일",
    spots: 8,
    tags: ["바다", "야경", "맛집"],
    color: "orange",
  },
  {
    title: "전주 먹거리 코스",
    duration: "6시간",
    spots: 6,
    tags: ["한옥", "음식", "전통"],
    color: "green",
  },
];

function MiniMapMock({ color }: { color: string }) {
  const colors: Record<string, string> = {
    blue: "from-blue-50 to-blue-100",
    orange: "from-orange-50 to-orange-100",
    green: "from-primary-50 to-primary-100",
  };

  return (
    <div
      className={`relative w-full h-32 rounded-lg bg-gradient-to-br ${colors[color]} overflow-hidden`}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #9ca3af 1px, transparent 1px),
            linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Nodes and spots */}
      <div className="absolute top-4 left-4">
        <NodeMarker size="sm" label="1" />
      </div>
      <div className="absolute top-8 left-12">
        <RecommendSpot size="sm" pulse={false} />
      </div>
      <div className="absolute top-6 right-8">
        <RecommendSpot size="sm" pulse={false} />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <NodeMarker size="sm" label="2" />
      </div>
      <div className="absolute bottom-4 right-4">
        <RecommendSpot size="sm" pulse={false} />
      </div>

      {/* Route lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 20 20 Q 50 40, 60 35 Q 80 30, 85 25"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          fill="none"
          className="opacity-50"
        />
        <path
          d="M 85 25 Q 70 60, 50 75"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          fill="none"
          className="opacity-50"
        />
      </svg>
    </div>
  );
}

export function ExampleCourses() {
  return (
    <SectionWrapper background="white">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          이런 코스를 만들 수 있어요
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          다른 사용자들이 만든 인기 코스를 구경해보세요
        </p>
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Mini Map Thumbnail */}
            <div className="p-4 pb-0">
              <MiniMapMock color={course.color} />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {course.title}
              </h3>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {course.spots}곳
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
