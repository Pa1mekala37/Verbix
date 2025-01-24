import {
  MessageSquare,
  User,
  Send,
  Image,
  Bell,
  Smile,
  Mic,
  FileText,
  Video,
} from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  
  const icons = [
    MessageSquare, 
    User,
    Send,
    Image,
    Bell,
    Smile,
    Mic,
    FileText,
    Video,
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            >
              <Icon className="w-8 h-8 text-primary" />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
