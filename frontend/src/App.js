// import { useState } from "react";
// import {useEffect} from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BottomNav from "./components/BottomNav";
// import KnowledgeNav from "./components/KnowledgeNav";

// import HomeScreen from "./screens/Home/HomeScreen";
// import AIChatScreen from "./screens/AI/AIChatScreen";
// import SilenceScreen from "./screens/Silence/SilenceScreen";

// import KnowledgeList from "./screens/Knowledge/KnowledgeList";
// import ContentReader from "./pages/ContentReader";
// import StoryParts from "./pages/StoryParts";
// import StoryChapters from "./pages/StoryChapters";

// import MantraList from "./screens/Mantra/MantraList";
// import MantraReader from "./screens/Mantra/MantraReader";

// import SongsList from "./screens/Songs/SongsList";
// import SongPlayer from "./screens/Songs/SongPlayer";

// import Bookmarks from "./pages/Bookmarks";
// import { Toaster } from "react-hot-toast";

// import JyotirlingaList from "./screens/Jyotirlinga/JyotirlingaList";
// import JyotirlingaReader from "./screens/Jyotirlinga/JyotirlingaReader";

// import Shiva3DBackground from "./components/Shiva3DBackground";
// import SpiritualLayout from "./components/SpiritualLayout";
// import VibhutiParticles from "./components/VibhutiParticles";

// import AdminDashboard from "./screens/Admin/AdminDashboard";

// // import LoginScreen from "./screens/Auth/LoginScreen";
// // import RegisterScreen from "./screens/Auth/RegisterScreen";
// // import ForgotPassword from "./screens/Auth/ForgotPassword";
// // import ResetPassword from "./screens/Auth/ResetPassword";

// import {runDailySadhanaReminder} from "./utils/sadhanaReminder";

// function App() {
//   const [mainTab, setMainTab] = useState("home");
//   const [knowledgeTab, setKnowledgeTab] = useState("about");

//   const [activeContent, setActiveContent] = useState(null);
//   const [activePart, setActivePart] = useState(null);
//   const [activeMantraSlug, setActiveMantraSlug] = useState(null);
//   const [activeJyotirlingaSlug, setActiveJyotirlingaSlug] = useState(null);
//   const [activeSong, setActiveSong] = useState(null);

//   const [aiEnergy, setAiEnergy] = useState(0);
//   // const [isAdmin, setIsAdmin] = useState(false);

//   // const [authScreen, setAuthScreen] = useState("login");
//   // const [resetToken, setResetToken] = useState(null);

//   // const isLoggedIn = !!localStorage.getItem("token");

//   const typeMap = {
//     about: "about",
//     symbols: "symbol",
//     family: "family",
//     forms: "form",
//     stories: "story",
//     teachings: "teaching",
//   };

//   useEffect(() => {
//     runDailySadhanaReminder();
//     const last = localStorage.getItem("lastAppOpen");
//   const today = new Date().toDateString();

//   if (last !== today) {
//     fetch(`${API_STATS}/app-open`, {
//       method: "POST",
//     });
//     localStorage.setItem("lastAppOpen", today);
//   }
//   }, []);

// //   useEffect(() => {
// //   const storedAdmin = localStorage.getItem("isAdmin");
// //   const admin = storedAdmin ? JSON.parse(storedAdmin) : false;
// //   setIsAdmin(admin);
// // }, []);

//   if(mainTab === "admin") {
//     return <AdminDashboard onBack = {() => setMainTab("home")} />;
//   } 

//   /* ================= AUTH FLOW ================= */
//   // if (!isLoggedIn) {
//   //   if (authScreen === "login")
//   //     return (
//   //       <LoginScreen
//   //         onSuccess={() => window.location.reload()}
//   //         goRegister={() => setAuthScreen("register")}
//   //         goForgot={() => setAuthScreen("forgot")}
//   //       />
//   //     );

//   //   if (authScreen === "register")
//   //     return <RegisterScreen goLogin={() => setAuthScreen("login")} />;

//   //   if (authScreen === "forgot")
//   //     return (
//   //       <ForgotPassword
//   //         goReset={(token) => {
//   //           setResetToken(token);
//   //           setAuthScreen("reset");
//   //         }}
//   //         goLogin = {() => setAuthScreen("login")}
//   //       />
//   //     );

//   //   if (authScreen === "reset")
//   //     return (
//   //       <ResetPassword
//   //         token={resetToken}
//   //         goLogin={() => setAuthScreen("login")}
//   //       />
//   //     );
//   // }

//   // /* ================= PREMIUM SCREEN ================= */
//   // if (mainTab === "premium") {
//   //   return (
//   //     <>
//   //       <Shiva3DBackground />
//   //       <PremiumScreen
//   //         onBack={() => setMainTab("home")}
//   //         onUnlock={(plan) => {
//   //           localStorage.setItem("isPremium", "true");
//   //           alert(`🙏 Premium ${plan} activated`);
//   //           setMainTab("home");
//   //         }}
//   //       />
//   //     </>
//   //   );
//   // }

//   /* ================= MAIN SCREEN RENDERER ================= */
//   const renderScreen = () => {
//     if (activeContent) {
//       return (
//         <ContentReader
//           type={activeContent.type}
//           slug={activeContent.slug}
//           onBack={() => setActiveContent(null)}
//         />
//       );
//     }

//     if (mainTab === "home") {
//       return (
//         <SpiritualLayout energy="calm">
//           <HomeScreen
//             goTo={setMainTab}
//             onResume={(data) => {
//               setActiveContent(data);
//               setMainTab("knowledge");
//             }}
//           />
//         </SpiritualLayout>
//       );
//     }

//     if (mainTab === "ai") {
//       return (
//         <SpiritualLayout energy="power">
//           <AIChatScreen
//             setAIEnergy={setAiEnergy}
//           />
//         </SpiritualLayout>
//       );
//     }

// //     if (mainTab === "admin") {
// //   const storedAdmin = localStorage.getItem("isAdmin");
// //   const isAdmin = storedAdmin ? JSON.parse(storedAdmin) : false;

// //   if (isAdmin?.role !== "admin") return null;
// //   return <AdminDashboard />;
// // }

//     if (mainTab === "silence") {
//       return (
//         <SpiritualLayout energy = "calm"> 
//         <SilenceScreen/>
//         </SpiritualLayout>
//       );
//     }

//     if (mainTab === "mantras") {
//       return activeMantraSlug ? (
//         <SpiritualLayout energy="chant">
//           <MantraReader
//             slug={activeMantraSlug}
//             onBack={() => setActiveMantraSlug(null)}
//           />
//         </SpiritualLayout>
//       ) : (
//         <MantraList
//           onSelect={setActiveMantraSlug}        />
//       );
//     }

//     if (mainTab === "songs") {
//       return activeSong ? (
//         <SpiritualLayout energy="chant">
//           <SongPlayer song={activeSong} onBack={() => setActiveSong(null)} />
//         </SpiritualLayout>
//       ) : (
//         <SongsList onSelect={setActiveSong} />
//       );
//     }

//     if (mainTab === "jyotirlingas") {
//       return activeJyotirlingaSlug ? (
//         <SpiritualLayout energy="wisdom">
//           <JyotirlingaReader
//             slug={activeJyotirlingaSlug}
//             onBack={() => setActiveJyotirlingaSlug(null)}
//           />
//         </SpiritualLayout>
//       ) : (
//         <JyotirlingaList onSelect={setActiveJyotirlingaSlug} />
//       );
//     }

//     if (mainTab === "bookmarks") {
//       return (
//         <Bookmarks
//           onBack={() => setMainTab("home")}
//           onSelect={(item) => {
//             setActiveContent(item);
//             setMainTab("knowledge");
//           }}
//         />
//       );
//     }

//     if (mainTab === "knowledge") {
//       return (
//         <>
//           <KnowledgeNav
//             current={knowledgeTab}
//             onChange={(tab) => {
//               setKnowledgeTab(tab);
//               setActivePart(null);
//             }}
//           />

//           {knowledgeTab === "stories" ? (
//             !activePart ? (
//               <StoryParts onSelectPart={setActivePart} />
//             ) : (
//               <StoryChapters
//                 part={activePart}
//                 onBack={() => setActivePart(null)}
//                 onSelectChapter={(slug) =>
//                   setActiveContent({ type: "story", slug })
//                 }
//               />
//             )
//           ) : (
//             <KnowledgeList
//               type={typeMap[knowledgeTab]}
//               title={knowledgeTab.toUpperCase()}
//               onSelect={(slug) =>
//                 setActiveContent({
//                   type: typeMap[knowledgeTab],
//                   slug,
//                 })
//               }
//             />
//           )}
//         </>
//       );
//     }

//     return null;
//   };

//   /* ================= APP ROOT ================= */
//   return (
//     <div style={{ minHeight: "100vh", position: "relative" }}>
//       <Shiva3DBackground aiEnergy={aiEnergy} />
//       <VibhutiParticles mode={mainTab === "ai" ? "intense" : "normal"} />

//       <div style={{ position: "relative", zIndex: 5, paddingBottom: 70 }}>
//         <Toaster position="bottom-center" />
//         {renderScreen()}
//         <BottomNav current={mainTab} onChange={setMainTab} />
//       </div>
//     </div>
//   );
// }

// export default App;



import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BottomNav from "./components/BottomNav";
import KnowledgeNav from "./components/KnowledgeNav";

import HomeScreen from "./screens/Home/HomeScreen";
import AIChatScreen from "./screens/AI/AIChatScreen";
import SilenceScreen from "./screens/Silence/SilenceScreen";

import KnowledgeList from "./screens/Knowledge/KnowledgeList";
import ContentReader from "./pages/ContentReader";
import StoryParts from "./pages/StoryParts";
import StoryChapters from "./pages/StoryChapters";

import MantraList from "./screens/Mantra/MantraList";
import MantraReader from "./screens/Mantra/MantraReader";

import SongsList from "./screens/Songs/SongsList";
import SongPlayer from "./screens/Songs/SongPlayer";

import Bookmarks from "./pages/Bookmarks";
import { Toaster } from "react-hot-toast";

import JyotirlingaList from "./screens/Jyotirlinga/JyotirlingaList";
import JyotirlingaReader from "./screens/Jyotirlinga/JyotirlingaReader";

import Shiva3DBackground from "./components/Shiva3DBackground";
import SpiritualLayout from "./components/SpiritualLayout";
import VibhutiParticles from "./components/VibhutiParticles";

import AdminDashboard from "./screens/Admin/AdminDashboard";
import { runDailySadhanaReminder } from "./utils/sadhanaReminder";
import { API_STATS } from "./services/apiBase";

function App() {
  const [mainTab, setMainTab] = useState("home");
  const [knowledgeTab, setKnowledgeTab] = useState("about");

  const [activeContent, setActiveContent] = useState(null);
  const [activePart, setActivePart] = useState(null);
  const [activeMantraSlug, setActiveMantraSlug] = useState(null);
  const [activeJyotirlingaSlug, setActiveJyotirlingaSlug] = useState(null);
  const [activeSong, setActiveSong] = useState(null);

  const [aiEnergy, setAiEnergy] = useState(0);

  const typeMap = {
    about: "about",
    symbols: "symbol",
    family: "family",
    forms: "form",
    stories: "story",
    teachings: "teaching",
  };

  useEffect(() => {
    runDailySadhanaReminder();

    const last = localStorage.getItem("lastAppOpen");
    const today = new Date().toDateString();

    if (last !== today) {
      fetch(`${API_STATS}/app-open`, {
        method: "POST",
      });
      localStorage.setItem("lastAppOpen", today);
    }
  }, []);

  /* ================= MAIN SCREEN ================= */
  const renderScreen = () => {
    if (activeContent) {
      return (
        <ContentReader
          type={activeContent.type}
          slug={activeContent.slug}
          onBack={() => setActiveContent(null)}
        />
      );
    }

    if (mainTab === "home") {
      return (
        <SpiritualLayout energy="calm">
          <HomeScreen
            goTo={setMainTab}
            onResume={(data) => {
              setActiveContent(data);
              setMainTab("knowledge");
            }}
          />
        </SpiritualLayout>
      );
    }

    if (mainTab === "ai") {
      return (
        <SpiritualLayout energy="power">
          <AIChatScreen setAIEnergy={setAiEnergy} />
        </SpiritualLayout>
      );
    }

    if (mainTab === "admin") {
      return <AdminDashboard />;
    }

    if (mainTab === "silence") {
      return (
        <SpiritualLayout energy="calm">
          <SilenceScreen />
        </SpiritualLayout>
      );
    }

    if (mainTab === "mantras") {
      return activeMantraSlug ? (
        <SpiritualLayout energy="chant">
          <MantraReader
            slug={activeMantraSlug}
            onBack={() => setActiveMantraSlug(null)}
          />
        </SpiritualLayout>
      ) : (
        <MantraList onSelect={setActiveMantraSlug} />
      );
    }

    if (mainTab === "songs") {
      return activeSong ? (
        <SpiritualLayout energy="chant">
          <SongPlayer song={activeSong} onBack={() => setActiveSong(null)} />
        </SpiritualLayout>
      ) : (
        <SongsList onSelect={setActiveSong} />
      );
    }

    if (mainTab === "jyotirlingas") {
      return activeJyotirlingaSlug ? (
        <SpiritualLayout energy="wisdom">
          <JyotirlingaReader
            slug={activeJyotirlingaSlug}
            onBack={() => setActiveJyotirlingaSlug(null)}
          />
        </SpiritualLayout>
      ) : (
        <JyotirlingaList onSelect={setActiveJyotirlingaSlug} />
      );
    }

    if (mainTab === "bookmarks") {
      return (
        <Bookmarks
          onBack={() => setMainTab("home")}
          onSelect={(item) => {
            setActiveContent(item);
            setMainTab("knowledge");
          }}
        />
      );
    }

    if (mainTab === "knowledge") {
      return (
        <>
          <KnowledgeNav
            current={knowledgeTab}
            onChange={(tab) => {
              setKnowledgeTab(tab);
              setActivePart(null);
            }}
          />

          {knowledgeTab === "stories" ? (
            !activePart ? (
              <StoryParts onSelectPart={setActivePart} />
            ) : (
              <StoryChapters
                part={activePart}
                onBack={() => setActivePart(null)}
                onSelectChapter={(slug) =>
                  setActiveContent({ type: "story", slug })
                }
              />
            )
          ) : (
            <KnowledgeList
              type={typeMap[knowledgeTab]}
              title={knowledgeTab.toUpperCase()}
              onSelect={(slug) =>
                setActiveContent({
                  type: typeMap[knowledgeTab],
                  slug,
                })
              }
            />
          )}
        </>
      );
    }

    return null;
  };

  /* ================= ROOT ================= */
  return (
    <Router>
      <Routes>
        {/* MAIN APP */}
        <Route
          path="/"
          element={
            <div style={{ minHeight: "100vh", position: "relative" }}>
              <Shiva3DBackground aiEnergy={aiEnergy} />
              <VibhutiParticles
                mode={mainTab === "ai" ? "intense" : "normal"}
              />

              <div style={{ position: "relative", zIndex: 5, paddingBottom: 70 }}>
                <Toaster position="bottom-center" />
                {renderScreen()}
                <BottomNav current={mainTab} onChange={setMainTab} />
              </div>
            </div>
          }
        />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
