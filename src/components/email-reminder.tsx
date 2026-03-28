import { Head, Tailwind } from "@react-email/components";

interface EmailTemplateProps {
  company: string;
  position: string;
  type: string;
}

export function EmailTemplate({ position, type, company }: EmailTemplateProps) {
  const getReminderMessage = () => {
    switch (type) {
      case "DEADLINE":
        return "Deadline for this application is coming up! Don't miss this opportunity!";
      case "INTERVIEW":
        return "Your interview is coming soon. Make sure you're prepared!";
      case "FOLLOW_UP":
        return "It's time to send a follow-up message to the hiring team.";
      default:
        return "Don't forget to take action on this opportunity!";
    }
  };

  const cleanedType = type.toLowerCase().replace("_", " ");
  return (
    <Tailwind>
      <Head />
      <div
        style={{
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div className="max-w-2xl mx-auto my-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(to right, #2563eb, #1d4ed8)",
            }}
            className="px-8 py-6"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">HireHunt</h1>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                Reminder
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Time to Take Action! ⏰
              </h2>
              <p className="text-gray-600 text-lg">
                Here&apos;s your reminder for the opportunity at{" "}
                <span className="font-semibold text-blue-600">{company}</span>.
              </p>
            </div>

            {/* Job Details Card */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                    Position
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {position}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                    Company
                  </p>
                  <p className="text-lg text-gray-800 font-semibold">
                    {company}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                    Reminder Type
                  </p>
                  <p className="text-lg text-gray-800 capitalize font-semibold">
                    {cleanedType}
                  </p>
                </div>
              </div>
            </div>

            {/* Reminder Message */}
            <div className="mb-8">
              <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📌</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Reminder:
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {getReminderMessage()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-sm text-gray-500 text-center border-t border-gray-100 pt-6 mt-4">
              This is an automated reminder from HireHunt. If you&apos;ve
              already taken care of this, you can ignore this email.
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">
                Need help? Contact us at{" "}
                <a
                  href="mailto:support@hirehunt.com"
                  style={{ color: "#2563eb" }}
                  className="hover:text-blue-700"
                >
                  support@hirehunt.com
                </a>
              </p>
              <p>2026 HireHunt.</p>
            </div>
          </div>
        </div>
      </div>
    </Tailwind>
  );
}
