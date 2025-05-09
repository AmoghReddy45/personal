import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Instagram } from "lucide-react";
interface ConnectingProps {
  className?: string;
}
const Connecting: React.FC<ConnectingProps> = ({ className }) => {
  const founderTypes = [
    {
      text: "Hire Me (i can build things) -> ",
      link: "mailto:reddy.amogh2004@gmail.com",
      linkText: "reddy.amogh2004@gmail.com",
      isEmail: true,
    },
    {
      text: "my instagram's cool too -> @am.reddywbsgdhbe",
      link: "https://www.instagram.com/am.reddywbsgdhbe/",
      isInstagram: true,
    },
  ];
  return (
    <section
      id="connecting"
      className={cn("py-20 bg-gray-50 mb-16", className)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
              Connect with me
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            {/* Empty FadeIn - Adding an empty div as children to fix the error */}
            <div></div>
          </FadeIn>

          <div className="space-y-4 mb-16">
            {founderTypes.map((item, index) => (
              <FadeIn key={index} delay={150 + index * 50}>
                <div className="flex items-start">
                  <span className="text-orangery-500 mr-3 mt-1">—</span>
                  <p className="text-muted-foreground text-base font-semibold">
                    {item.text}
                    {item.isEmail && (
                      <a
                        href={item.link}
                        className="text-blue-500 hover:underline"
                      >
                        {item.linkText}
                      </a>
                    )}
                    {item.isInstagram && (
                      <a
                        href={item.link}
                        className="inline-flex items-center text-blue-500 hover:underline ml-1"
                      >
                        <Instagram size={16} className="ml-1" />
                      </a>
                    )}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Connecting;
