import NavigationSection from "../components/NavigationSection";
import ProfileSection from "../components/ProfileSection";
import NewsFeedSection from "../components/NewsFeedSection";
import AllUsersSection from "../components/AllUsersSection";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen gap-4 p-4 bg-[#1a1a1a] text-white">
      {/* Navigation Section */}
      <NavigationSection />

      {/* Profile, News Feed, and All Users Sections */}
      <div className="flex flex-1 gap-4">
        <ProfileSection />
        <NewsFeedSection />
        <AllUsersSection />
      </div>
    </div>
  );
};

export default Home;
