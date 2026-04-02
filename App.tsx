
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronRight, 
  User, 
  Search, 
  Droplets, 
  Check, 
  ArrowRight,
  Zap, 
  Sparkles, 
  Loader2, 
  Plus, 
  Minus,
  X, 
  RefreshCw, 
  Send,
  Scale,
  Users,
  ChevronDown,
  Trash2,
  History,
  Clock,
  Eye, 
  Camera,
  Scan,
  Maximize2, 
  Brain, 
  Shield, 
  Moon,
  ArrowLeft,
  Activity,
  Video,
  Info,
  TrendingUp,
  Target,
  Heart,
  Mail,
  ShieldCheck,
  Award,
  FileText,
  Download,
  ExternalLink,
  Settings,
  Palette,
  Trophy,
  BarChart3,
  Share2,
  Calendar,
  Glasses,
  TreePine,
  AlertTriangle,
  Bell,
  Edit2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Digital Twin Component - Refined Memoji Style
const DigitalTwin = ({ config, size = "md" }: { config: AvatarConfig, size?: "sm" | "md" | "lg" }) => {
  const dimensions = {
    sm: "w-24 h-24",
    md: "w-48 h-48",
    lg: "w-64 h-64"
  };

  const [isBlinking, setIsBlinking] = useState(false);
  const [isMouthMoving, setIsMouthMoving] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);

    const mouthInterval = setInterval(() => {
      setIsMouthMoving(true);
      setTimeout(() => setIsMouthMoving(false), 300);
    }, 6000);

    const tiltInterval = setInterval(() => {
      setHeadTilt(Math.random() * 4 - 2);
    }, 3000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(mouthInterval);
      clearInterval(tiltInterval);
    };
  }, []);

  const skinTone = config?.skinTone || '#FFDBAC';
  const hairColor = config?.hairColor || '#4B2C20';
  const clothingColor = config?.clothingColor || '#4F46E5';
  const hairStyle = config?.hairStyle || 'short';
  const expression = config?.expression || 'neutral';
  const imageUrl = config?.imageUrl;

  return (
    <div className={`relative ${dimensions[size]} mx-auto group`}>
      {/* Premium Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
      
      {/* Avatar Container - Squircle with Glass Effect */}
      <motion.div 
        animate={{ 
          y: [0, -4, 0],
          rotate: headTilt
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 3, ease: "easeInOut" }
        }}
        className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-[40%] border-[1px] border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-gradient-to-b from-white/90 to-slate-100/90 backdrop-blur-3xl transition-all duration-500"
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Digital Twin" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={skinTone} />
              <stop offset="60%" stopColor={adjustColor(skinTone, -10)} />
              <stop offset="100%" stopColor={adjustColor(skinTone, -25)} />
            </linearGradient>
            <radialGradient id="faceShading" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="black" stopOpacity="0" />
              <stop offset="85%" stopColor="black" stopOpacity="0.05" />
              <stop offset="100%" stopColor="black" stopOpacity="0.15" />
            </radialGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={adjustColor(hairColor, 20)} />
              <stop offset="40%" stopColor={hairColor} />
              <stop offset="100%" stopColor={adjustColor(hairColor, -40)} />
            </linearGradient>
            <linearGradient id="clothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={adjustColor(clothingColor, 10)} />
              <stop offset="100%" stopColor={adjustColor(clothingColor, -20)} />
            </linearGradient>
            <filter id="eyeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
              <feOffset dx="0" dy="1" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Body */}
          <path 
            d="M10,105 C10,85 25,72 50,72 C75,72 90,85 90,105 L90,110 L10,110 Z" 
            fill="url(#clothGrad)" 
          />
          
          {/* Neck */}
          <path 
            d="M43,68 Q50,76 57,68 L57,82 Q50,86 43,82 Z" 
            fill={adjustColor(skinTone, -15)} 
          />
          
          {/* Head Shape */}
          <path 
            d="M28,44 C28,20 36,14 50,14 C64,14 72,20 72,44 C72,70 62,80 50,80 C38,80 28,70 28,44 Z" 
            fill="url(#skinGrad)" 
          />
          <path 
            d="M28,44 C28,20 36,14 50,14 C64,14 72,20 72,44 C72,70 62,80 50,80 C38,80 28,70 28,44 Z" 
            fill="url(#faceShading)" 
          />
          
          {/* Ears */}
          <path d="M28,42 Q22,42 22,48 Q22,54 28,54 Z" fill={adjustColor(skinTone, -10)} />
          <path d="M72,42 Q78,42 78,48 Q78,54 72,54 Z" fill={adjustColor(skinTone, -10)} />
          
          {/* Hair Styles - More Detailed */}
          {hairStyle === 'short' && (
            <g fill="url(#hairGrad)">
              <path d="M28,44 C28,18 36,10 50,10 C64,10 72,18 72,44 L72,36 C72,14 64,8 50,8 C36,8 28,14 28,36 Z" />
              <path d="M35,18 Q50,8 65,18" fill="none" stroke={adjustColor(hairColor, 30)} strokeWidth="0.5" opacity="0.4" />
              <path d="M40,15 Q50,10 60,15" fill="none" stroke={adjustColor(hairColor, 30)} strokeWidth="0.5" opacity="0.4" />
            </g>
          )}
          {hairStyle === 'long' && (
            <g fill="url(#hairGrad)">
              <path d="M28,44 C28,16 36,10 50,10 C64,10 72,16 72,44 L78,90 C78,98 68,98 68,90 L63,52 L37,52 L32,90 C32,98 22,98 22,90 Z" />
              <path d="M32,32 Q50,18 68,32" fill="none" stroke={adjustColor(hairColor, 30)} strokeWidth="0.5" opacity="0.3" />
            </g>
          )}
          {hairStyle === 'curly' && (
            <g fill="url(#hairGrad)">
              {[
                {cx:28, cy:28, r:13}, {cx:40, cy:18, r:13}, {cx:50, cy:14, r:13}, 
                {cx:60, cy:18, r:13}, {cx:72, cy:28, r:13}, {cx:22, cy:42, r:11}, 
                {cx:78, cy:42, r:11}, {cx:50, cy:25, r:16}
              ].map((c, i) => (
                <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
              ))}
            </g>
          )}
          {hairStyle === 'ponytail' && (
            <g fill="url(#hairGrad)">
              <path d="M28,44 C28,18 36,10 50,10 C64,10 72,18 72,44 L72,36 C72,14 64,8 50,8 C36,8 28,14 28,36 Z" />
              <path d="M72,30 Q85,25 85,45 Q85,65 75,70 Q70,72 72,60 Z" />
              <circle cx="72" cy="35" r="4" fill={clothingColor} />
            </g>
          )}
          {hairStyle === 'mohawk' && (
            <g fill="url(#hairGrad)">
              <path d="M45,10 Q50,0 55,10 L55,40 Q50,45 45,40 Z" />
              <path d="M48,12 Q50,5 52,12 L52,38 Q50,42 48,38 Z" fill={adjustColor(hairColor, 30)} opacity="0.3" />
            </g>
          )}

          {/* Accessories */}
          {config?.glasses && (
            <g fill="none" stroke="#333" strokeWidth="1.5">
              <rect x="32" y="44" width="16" height="10" rx="4" />
              <rect x="52" y="44" width="16" height="10" rx="4" />
              <path d="M48,49 L52,49" />
              <path d="M32,49 L28,48" />
              <path d="M68,49 L72,48" />
            </g>
          )}
          {config?.earrings && (
            <g fill="#FFD700">
              <circle cx="24" cy="52" r="1.5" />
              <circle cx="76" cy="52" r="1.5" />
            </g>
          )}

          {/* Eyebrows */}
          <g opacity="0.6">
            <path 
              d={expression === 'smile' ? "M34,38 Q40,35 46,38" : "M34,39 Q40,38 46,39"} 
              fill="none" stroke={adjustColor(hairColor, -20)} strokeWidth="2.5" strokeLinecap="round" 
            />
            <path 
              d={expression === 'smile' ? "M54,38 Q60,35 66,38" : "M54,39 Q60,38 66,39"} 
              fill="none" stroke={adjustColor(hairColor, -20)} strokeWidth="2.5" strokeLinecap="round" 
            />
          </g>

          {/* Eyes */}
          <g filter="url(#eyeShadow)">
            {/* Left Eye */}
            <motion.g animate={{ scaleY: isBlinking ? 0.05 : 1 }} transition={{ duration: 0.1 }}>
              <ellipse cx="40" cy="48" rx="5" ry="5.5" fill="white" />
              <circle cx="40" cy="48" r="3.5" fill="#1a1a1a" />
              <circle cx="41.5" cy="46" r="1.5" fill="white" opacity="0.9" />
            </motion.g>
            {/* Right Eye */}
            <motion.g animate={{ scaleY: isBlinking ? 0.05 : 1 }} transition={{ duration: 0.1 }}>
              <ellipse cx="60" cy="48" rx="5" ry="5.5" fill="white" />
              <circle cx="60" cy="48" r="3.5" fill="#1a1a1a" />
              <circle cx="61.5" cy="46" r="1.5" fill="white" opacity="0.9" />
            </motion.g>
          </g>

          {/* Nose - More Defined */}
          <path d="M48,56 Q50,60 52,56" fill="none" stroke="#5d2e0c" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
          <path d="M50,52 L50,58" fill="none" stroke="#5d2e0c" strokeWidth="0.5" opacity="0.1" />

          {/* Mouth */}
          {expression === 'smile' && (
            <motion.path 
              d={isMouthMoving ? "M36,64 Q50,76 64,64" : "M38,63 Q50,72 62,63"} 
              fill="none" 
              stroke="#5d2e0c" 
              strokeWidth="3" 
              strokeLinecap="round" 
              opacity="0.6" 
              animate={{ d: isMouthMoving ? "M36,64 Q50,76 64,64" : "M38,63 Q50,72 62,63" }}
            />
          )}
          {expression === 'neutral' && (
            <motion.path 
              d={isMouthMoving ? "M42,66 L58,66" : "M43,65 L57,65"} 
              fill="none" 
              stroke="#5d2e0c" 
              strokeWidth="3" 
              strokeLinecap="round" 
              opacity="0.6" 
              animate={{ d: isMouthMoving ? "M42,66 L58,66" : "M43,65 L57,65" }}
            />
          )}
          {expression === 'surprised' && (
            <motion.ellipse 
              cx="50" cy="65" rx={isMouthMoving ? "6" : "5"} ry={isMouthMoving ? "8" : "7"}
              fill="none" 
              stroke="#5d2e0c" 
              strokeWidth="3" 
              opacity="0.6" 
              animate={{ rx: isMouthMoving ? 6 : 5, ry: isMouthMoving ? 8 : 7 }}
            />
          )}

          {/* Cheeks */}
          <circle cx="32" cy="62" r="6" fill="#ff4d4d" opacity="0.15" />
          <circle cx="68" cy="62" r="6" fill="#ff4d4d" opacity="0.15" />
        </svg>
        )}
      </motion.div>
      
      {/* Status Indicator */}
      <div className="absolute bottom-3 right-3 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full z-20 shadow-lg animate-pulse"></div>
    </div>
  );
};

// Helper to adjust color for gradients
function adjustColor(color: string, amount: number) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// --- 介面文字字典 ---
const translations: Record<string, any> = {
  zh: {
    setupTitle: "個人健康中心",
    remaining: "今日剩餘",
 kcalUnit: "KCAL 剩餘",
 bmi: "BMI",
 water: "今日飲水",
 searchPlaceholder: "智慧搜尋：輸入「橙」、「雞肉飯」...",
 aiBtn: "AI 識別",
 aiRec: "智性 AI 配餐",
 aiSub: "人性化份量優化",
 catTitle: "數據庫瀏覽",
 height: "身高 (CM)",
 weight: "體重 (KG)",
 age: "年齡",
 gender: "性別",
 male: "男",
 female: "女",
 activity: "運動習慣",
 statusNormal: "體重正常",
 statusUnder: "體重過輕",
 statusOver: "過重 / 胖",
 customWater: "自訂份量 (ml)",
 add: "加入",
 quickAdd: "選擇飲水量",
 profile: "家庭設定",
 refresh: "換一批",
 breakfast: "健康早餐",
 lunch: "家常午餐",
 dinner: "豐盛晚餐",
 ingredients: "食材與份量",
 method: "烹飪方法",
 nutritionalInfo: "營養資訊 (每份)",
 addIntake: "確認加入今日攝取",
 aiSearching: "AI 正在分析營養...",
 aiSearchBtn: "AI 分析營養",
 selectPortion: "請選擇份量",
 portionUnit: "份量",
 foodBriefTitle: "食物簡介",
 refinementTitle: "AI 需要更多細節",
 refinementPlaceholder: "例如：很大份、非常油、加了甜醬...",
 refinementConfirm: "確認細節並分析",
 aiMentor: "AI 營養導師",
 aiMentorLabel: "AI 營養師",
 aiChatPlaceholder: "問問我營養建議...",
 aiChatDisclaimer: "💡 提示：AI 建議僅供參考，不具專業醫療診斷效力。如有疑問請諮詢專業醫師。",
 aiChatWelcome: "你好！我是你的 AI 營養導師。根據你的數據，我能為你提供精準的飲食建議。今天想了解什麼？",
 dbSearchPlaceholder: "搜尋食物名稱...",
 dbAll: "全部",
 dbSubgroups: "子群組瀏覽",
 customPortionLabel: "自訂克數 (g)",
 customPortionHint: "輸入精確重量進行計算",
 nameLabel: "暱稱 (如: 爺爺)",
 createProfileBtn: "建立檔案",
 historyTitle: "今日飲食紀錄",
 noHistory: "尚無紀錄，快去新增第一筆吧！",
 deleteRecord: "刪除紀錄",
 actionMenuTitle: "快速行動",
 shapeStretchTitle: "形伸營",
 shapeStretchDesc: "四大機能修復：針對性解決亞健康",
 catEye: "久坐護眼護頸",
 catEyeDesc: "改善螢幕僵硬",
 catCirculation: "碎片循環活絡",
 catCirculationDesc: "狹窄空間適用：促進血液循環",
 catStress: "深層舒壓伸展",
 catStressDesc: "釋放壓力：緩解肩背緊繃",
 catCore: "防跌核心預防",
 catCoreDesc: "強化核心：預防跌倒與勞損",
 catSleep: "睡前放鬆",
 catSleepDesc: "感知當下狀態，AI 推薦修復計畫",
 back: "返回",
 startExercise: "開始",
 equipment: "器材",
 chair: "🪑 椅子",
 band: "🎗️ 彈力帶",
 bodyweight: "🧘 徒手",
 generateVideo: "✨ AI 生成示範影片",
 generating: "AI 導演拍攝中 (約需 1-2 分鐘)...",
 videoError: "影片生成失敗，請重試",
 tabAll: "全部",
 tabStretch: "🧘 伸展",
 tabExercise: "⚡ 運動",
 satFat: "飽和脂肪",
 transFat: "反式脂肪",
 sodium: "鈉含量",
 sugar: "糖份",
 nuVisionTitle: "NuVision 智能街市",
 marketChallenge: "街市採購挑戰",
 budgetGoal: "預算 $50 • 目標：均衡一餐",
 remainingBudget: "剩餘預算",
 selectedItems: "已選食材",
 quantity: "數量",
 clearCart: "清空購物籃",
 adjustQuantities: "調整數量",
 all: "全部",
 grains: "穀物",
 meat: "肉類",
 fruits: "水果",
 veggies: "蔬菜",
 nutritionScore: "營養均衡評分",
 macroRatio: "三大營養素比例",
 protein: "蛋白質",
 carbs: "碳水",
 fat: "脂肪",
 deepAnalysis: "深度解析 (隱藏陷阱)",
 hiddenNutrients: "隱藏營養素",
 aiAdvice: "AI 營養導師建議",
 scanNext: "掃描下一組 (Scan Next)",
 aiAnalyzing: "AI 正在深度解析...",
 aiAnalyzeBtn: "AI 分析",
 editProfile: "編輯檔案",

 hydrationTimer: "補水計時",
 maxItems: "已達食材種類上限 ({0} 樣) (Max {0} items reached)",
 overBudget: "超出預算！(Over Budget)",
 analysisFailed: "分析失敗，請重試 (Analysis failed)",
 calories: "卡路里",
 pro: "蛋白質",
 carb: "碳水",
 fat_label: "脂肪",
 kcal: "千卡",
 progress: "進度",
 weightTrend: "體重走勢",
 digitalTwin: "虛擬化身 (Digital Twin)",
 targetWeight: "目標體重",
 currentWeight: "目前體重",
 weightHistory: "體重紀錄",
 statusRefreshing: "神清氣爽",
 statusLowEnergy: "能量低迷",
 statusNormalEnergy: "狀態良好",
    weightGoalProgress: "減重進度",
    weightUnit: "KG",
    addWeight: "記錄體重",
    nuVisionScannerTitle: "NuVision AI 掃描器",
    interactiveTitle: "互動環節",
    exerciseTitle: "運動追蹤",
    notifications: "通知提醒",
    searchFood: "搜尋食材",
    searchExercise: "搜尋運動",
    caloriesBurned: "消耗熱量",
    duration: "時長",
    min: "分鐘",
    treeLevel: "樹木等級",
    waterToGrow: "再喝 {amount}ml 即可成長",
    overeatWarning: "今日攝入過多，建議增加運動！",
    wellnessGarden: "健康花園",
    academicSources: "學術來源",
    nuVisionScannerDesc: "掃描食物或標籤，深度解析營養與陷阱",
    scanFood: "掃描食物",
    scanLabel: "掃描標籤",
    hiddenTraps: "隱藏陷阱",
    aiNutritionMentor: "AI 營養導師",
    addToIntake: "加入今日攝取",
    proportion: "營養比例",
    halfPortion: "0.5倍",
    standardPortion: "標準 (1x)",
    largePortion: "1.5倍",
    doublePortion: "2倍",
    aiSuggestion: "AI 建議",
    customizeAvatar: "自訂化身",
    skinTone: "膚色",
    hairStyle: "髮型",
    hairColor: "髮色",
    clothingColor: "服裝顏色",
    expression: "表情",
    short: "短髮",
    long: "長髮",
    curly: "捲髮",
    bald: "無髮",
    smile: "微笑",
    neutral: "平靜",
    surprised: "驚訝",
    personalTitle: "個人中心",
    infoSection: "資訊與免責聲明",
    dataSources: "數據來源",
    disclaimer: "免責聲明",
    supportSection: "社群與支援",
    feedback: "意見回饋",
    bodyData: "身體數據",
    healthReport: "AI 健康週報",
    achievements: "成就勳章",
    exportData: "匯出數據",
    disclaimerText: "本程式提供的營養資訊及 AI 建議僅供參考，不具專業醫療診斷效力。在進行任何重大飲食或運動改變前，請諮詢醫生或註冊營養師。",
    dataSourceText: "數據來源參考：世界衛生組織 (WHO)、美國農業部 (USDA)、香港衞生署、英國國民保健署 (NHS) 及各國營養數據庫。",
    feedbackEmail: "info.nubalance@gmail.com",

    bodyFat: "體脂率",
    muscleMass: "肌肉量",
    bmr: "基礎代謝",
  },
  en: {
    setupTitle: "Personal Health Hub",
    remaining: "Remaining",
 kcalUnit: "KCAL Left",
 bmi: "BMI",
 water: "Water Intake",
 searchPlaceholder: "Smart search...",
 aiBtn: "AI Scan",
 aiRec: "AI Meal Plan",
 aiSub: "Personalized Portions",
 catTitle: "Database",
 height: "Height (CM)",
 weight: "Weight (KG)",
 age: "Age",
 gender: "Gender",
 male: "Male",
 female: "Female",
 activity: "Activity Level",
 statusNormal: "Normal",
 statusUnder: "Underweight",
 statusOver: "Overweight",
 customWater: "Custom (ml)",
 add: "Add",
 quickAdd: "Select Amount",
 profile: "Family Setup",
 refresh: "Refresh",
 breakfast: "Breakfast",
 lunch: "Lunch",
 dinner: "Dinner",
 ingredients: "Ingredients",
 method: "Cooking Method",
 nutritionalInfo: "Nutrition Info",
 addIntake: "Confirm Intake",
 aiSearching: "AI analyzing...",
 aiSearchBtn: "AI Analysis",
 selectPortion: "Select Portion",
 portionUnit: "Portion",
 foodBriefTitle: "Brief Info",
 refinementTitle: "AI Needs More Details",
 refinementPlaceholder: "e.g., Large portion, very oily...",
 refinementConfirm: "Confirm & Analyze",
 aiMentor: "AI Nutrition Mentor",
 aiMentorLabel: "AI Mentor",
 aiChatPlaceholder: "Ask me for advice...",
 aiChatDisclaimer: "💡 Note: AI advice is for reference only and not for medical diagnosis.",
 aiChatWelcome: "Hello! I am your AI Nutrition Mentor. How can I help you today?",
 dbSearchPlaceholder: "Search food name...",
 dbAll: "All",
 dbSubgroups: "Subgroups",
 customPortionLabel: "Custom Weight (g)",
 customPortionHint: "Enter weight for precise calculation",
 nameLabel: "Nickname (e.g. Grandpa)",
 createProfileBtn: "Create Profile",
 historyTitle: "Today's Log",
 noHistory: "No records yet. Add your first meal!",
 deleteRecord: "Delete Record",
 actionMenuTitle: "Quick Actions",
 shapeStretchTitle: "Shape & Stretch",
 shapeStretchDesc: "Targeted Solutions for Sub-health",
 catEye: "Eye & Neck Care",
 catEyeDesc: "Recommended: Fix Screen Stiffness",
 catCirculation: "Circulation Boost",
 catCirculationDesc: "Small Spaces: Boost Blood Flow",
 catStress: "Deep Stress Relief",
 catStressDesc: "Release Tension: Soothe Shoulders",
 catCore: "Anti-fall Core",
 catCoreDesc: "Strengthen Core: Prevent Falls",
 catSleep: "Pre-sleep Relax",
 catSleepDesc: "AI Recommended Repair Plan",
 back: "Back",
 startExercise: "Start",
 equipment: "Equip",
 chair: "🪑 Chair",
 band: "🎗️ Band",
 bodyweight: "🧘 Body",
 generateVideo: "✨ AI Video Demo",
 generating: "AI Director filming (1-2 mins)...",
 videoError: "Generation failed, try again",
 tabAll: "All",
 tabStretch: "🧘 Stretch",
 tabExercise: "⚡ Exercise",
 satFat: "Sat. Fat",
 transFat: "Trans Fat",
 sodium: "Sodium",
 sugar: "Sugar",
 nuVisionTitle: "NuVision Smart Market",
 marketChallenge: "Market Challenge",
 budgetGoal: "Budget $50 • Goal: Balanced Meal",
 remainingBudget: "Remaining Budget",
 selectedItems: "Selected Items",
 quantity: "Quantity",
 clearCart: "Clear Cart",
 adjustQuantities: "Adjust Quantities",
 all: "All",
 grains: "Grains",
 meat: "Meat",
 fruits: "Fruits",
 veggies: "Veggies",
 nutritionScore: "Nutrition Score",
 macroRatio: "Macro Ratio",
 protein: "Protein",
 carbs: "Carbs",
 fat: "Fat",
 deepAnalysis: "Deep Analysis (Hidden Traps)",
 hiddenNutrients: "Hidden Nutrients",
 aiAdvice: "AI Nutrition Advice",
 scanNext: "Scan Next",
 aiAnalyzing: "AI Analyzing...",
 aiAnalyzeBtn: "AI Analyze",
 editProfile: "Edit Profile",

 hydrationTimer: "Hydration Timer",
 maxItems: "Max {0} items reached",
 overBudget: "Over Budget!",
 analysisFailed: "Analysis failed, try again",
 calories: "Calories",
 pro: "PRO",
 carb: "CARB",
 fat_label: "FAT",
 kcal: "kcal",
 progress: "Progress",
 weightTrend: "Weight Trend",
 digitalTwin: "Digital Twin",
 targetWeight: "Target Weight",
 currentWeight: "Current Weight",
 weightHistory: "Weight History",
 statusRefreshing: "Refreshing",
 statusLowEnergy: "Low Energy",
 statusNormalEnergy: "Good State",
    weightGoalProgress: "Weight Goal Progress",
    weightUnit: "kg",
    addWeight: "Log Weight",
    nuVisionScannerTitle: "NuVision AI Scanner",
    interactiveTitle: "Interactive",
    exerciseTitle: "Exercise Tracking",
    notifications: "Notifications",
    searchFood: "Search Food",
    searchExercise: "Search Exercise",
    caloriesBurned: "Calories Burned",
    duration: "Duration",
    min: "min",
    treeLevel: "Tree Level",
    waterToGrow: "Drink {amount}ml more to grow",
    overeatWarning: "Intake is high today, consider more exercise!",
    wellnessGarden: "Wellness Garden",
    academicSources: "Academic Sources",
    nuVisionScannerDesc: "Scan food or labels for deep nutrition analysis",
    scanFood: "Scan Food",
    scanLabel: "Scan Label",
    hiddenTraps: "Hidden Traps",
    aiNutritionMentor: "AI Nutrition Mentor",
    addToIntake: "Add to Daily Intake",
    proportion: "Proportion",
    halfPortion: "0.5x",
    standardPortion: "Standard (1x)",
    largePortion: "1.5x",
    doublePortion: "2x",
    aiSuggestion: "AI Suggestion",
    customizeAvatar: "Customize Avatar",
    skinTone: "Skin Tone",
    hairStyle: "Hair Style",
    hairColor: "Hair Color",
    clothingColor: "Clothing Color",
    expression: "Expression",
    short: "Short",
    long: "Long",
    curly: "Curly",
    bald: "Bald",
    smile: "Smile",
    neutral: "Neutral",
    surprised: "Surprised",
    personalTitle: "Personal",
    infoSection: "Info & Disclaimer",
    dataSources: "Data Sources",
    disclaimer: "Disclaimer",
    supportSection: "Support & Community",
    feedback: "Feedback",
    bodyData: "Body Data",
    healthReport: "AI Health Report",
    achievements: "Achievements",
    exportData: "Export Data",
    disclaimerText: "Nutritional info and AI suggestions are for reference only and not for medical diagnosis. Consult a doctor or dietitian before major dietary changes.",
    dataSourceText: "Data sources: WHO, USDA, HK Dept of Health, NHS, and global nutrition databases.",
    feedbackEmail: "info.nubalance@gmail.com",

    bodyFat: "Body Fat",
    muscleMass: "Muscle Mass",
    bmr: "BMR",
  },
};

interface FoodDatabaseItem {
  id: string;
  name: string;
  category: string;
  subgroup?: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string;
  method: string[];
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface Recipe {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  sodium: number;
  sugar: number;
  ingredients: string;
  method: string[];
}

interface AiPortion {
  label: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat?: number;
  transFat?: number;
  sodium?: number;
  sugar?: number;
  isCustomBase?: boolean;
}

interface AiSearchResult {
  needsMoreInfo: boolean;
  promptMessage?: string;
  name?: string;
  emoji?: string;
  brief?: string;
  portions?: AiPortion[];
}

interface ProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit: string;
}

interface LogEntry {
  id: string;
  name: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat?: number;
  transFat?: number;
  sodium?: number;
  sugar?: number;
  time: string;
}

interface WeightEntry {
  id: string;
  weight: number;
  date: string;
}

interface AvatarConfig {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  clothingColor: string;
  expression: string;
  glasses?: boolean;
  earrings?: boolean;
  imageUrl?: string;
}

interface HealthReport {
  id: string;
  date: string;
  content: string;
  title: string;
}

interface UserProfile {
  id: string;
  name: string;
  height: string;
  weight: string;
  targetWeight: string;
  age: string;
  gender: string;
  activity: string;
  logs: LogEntry[]; 
  waterIntake: number;
  avatarColor: string;
  weightHistory: WeightEntry[];
  avatarConfig?: AvatarConfig;
  healthReports?: HealthReport[];
  exercises?: ExerciseLog[];
  notificationsEnabled?: boolean;
}

interface ExerciseLog {
  id: string;
  name: string;
  caloriesBurned: number;
  duration: number; // minutes
  time: string;
}

interface Exercise {
  id: string;
  name: string;
  duration: string;
  instruction: string;
  equipment: 'chair' | 'band' | 'bodyweight';
  type: 'stretch' | 'exercise';
  demoVideoUrl?: string;
  sets?: string;
}

// --- SHAPE & STRETCH CONTENT ---
const SHAPE_STRETCH_CONTENT: Record<string, Exercise[]> = {
  catEye: [
    { id: 'e_s1', name: '頸部側拉 (Neck Side Stretch)', duration: '30秒/邊 (30s/side)', sets: '3組 (3 sets)', instruction: '站立或坐姿，單手固定對側肩膀，頭部輕輕向同側傾斜。 (Stand or sit, fix one shoulder with the opposite hand, gently tilt head to the same side.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/1.mp4' },
    { id: 'e_s2', name: '抬頭望天 (Neck Extension)', duration: '15秒 (15s)', sets: '3組 (3 sets)', instruction: '雙手交疊按住胸口皮膚，慢慢抬頭向上延伸頸部前側。 (Place hands on chest, slowly look up to stretch the front of the neck.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/2.mp4' },
    { id: 'e_s3', name: '低頭伸展 (Neck Flexion)', duration: '15秒 (15s)', sets: '3組 (3 sets)', instruction: '雙手輕抱後腦勺，輕輕向下壓，下巴找鎖骨，伸展後頸。 (Gently hold the back of your head and press down, chin to collarbone.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/3.mp4' },
    { id: 'e_s4', name: '轉頭側視 (Neck Rotation)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '保持肩膀不動，頭部緩慢向左轉到底，再向右轉到底。 (Keep shoulders still, slowly turn head to the left and then to the right.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/4.mp4' },
    { id: 'e_s5', name: '擴胸伸展 (Chest Opener)', duration: '20秒 (20s)', sets: '3組 (3 sets)', instruction: '站立，雙手在背後十指交扣，向後向下延伸，挺胸看前方。 (Stand, interlace fingers behind back, stretch back and down.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/5.mp4' },
    { id: 'e_s6', name: '手腕伸展 (Wrist Extensor)', duration: '15秒/邊 (15s/side)', sets: '3組 (3 sets)', instruction: '手臂伸直掌心向外，另一手將手指輕輕向後扳。 (Extend arm, palm out, gently pull fingers back with the other hand.)', equipment: 'bodyweight', type: 'stretch' },
    { id: 'e_s7', name: '上斜方肌伸展 (Upper Trap)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '站姿，一手置於背後，頭向對側傾斜並微微轉向腋下。 (Stand, one hand behind back, tilt head to the opposite side.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/7.mp4' },
    { id: 'e_s8', name: '鷹式手部 (Eagle Arms)', duration: '15秒 (15s)', sets: '3組 (3 sets)', instruction: '雙臂交纏，手肘抬高至肩膀高度，伸展上背部。 (Cross arms, lift elbows to shoulder height to stretch upper back.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/8.mp4' },
    { id: 'e_s9', name: '靠牆胸肌伸展 (Wall Pec)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '前臂抵住門框或牆角，身體向前傾，感受胸大肌拉伸。 (Forearm against wall, lean forward to stretch chest.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/9.mp4' },
    { id: 'e_s10', name: '眼球極限轉動 (Eye Circles)', duration: '30秒 (30s)', sets: '3組 (3 sets)', instruction: '順時針轉動眼球至極限位置，再逆時針轉動。 (Rotate eyes clockwise to the limit, then counter-clockwise.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/10.mp4' },
    { id: 'e_e1', name: '站姿收下巴 (Chin Tucks)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '背貼牆站立，後腦勺用力頂牆，擠出雙下巴，強化深層頸屈肌。 (Stand against wall, press head back to strengthen neck muscles.)', equipment: 'bodyweight', type: 'exercise' },
    { id: 'e_e2', name: '彈力帶開胸 (Band Pull Apart)', duration: '15次 (15 reps)', sets: '3組 (3 sets)', instruction: '雙手握彈力帶平舉，向兩側拉開至觸胸，夾緊肩胛。 (Hold band, pull apart to chest, squeeze shoulder blades.)', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/12.MOV' },
    { id: 'e_e3', name: '眼球8字操 (Figure 8)', duration: '1分鐘 (1 min)', sets: '3組 (3 sets)', instruction: '頭不動，視線在前方畫橫向8字，訓練眼部肌肉協調。 (Move eyes in a figure-8 pattern without moving your head.)', equipment: 'bodyweight', type: 'exercise' },
    { id: 'e_e4', name: '遠近聚焦 (Focus Shift)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '伸出拇指，視線在拇指與遠方物體間快速切換。 (Shift focus between your thumb and a distant object.)', equipment: 'bodyweight', type: 'exercise' },
    { id: 'e_e5', name: '站姿聳肩 (Standing Shrugs)', duration: '15次 (15 reps)', sets: '3組 (3 sets)', instruction: '雙肩用力向上聳起找耳朵，停留1秒後放下。 (Shrug shoulders up to ears, hold for 1s, then release.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/15.MOV' },
    { id: 'e_e6', name: '肩胛後收 (Scapular Squeeze)', duration: '15次 (15 reps)', sets: '3組 (3 sets)', instruction: '站立，手肘彎曲90度貼身，向後夾緊背部肌肉。 (Stand, elbows at 90 degrees, squeeze shoulder blades back.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/16.mp4' },
    { id: 'e_e7', name: '頸部等長抗阻 (Iso Neck)', duration: '10秒/向 (10s/direction)', sets: '3組 (3 sets)', instruction: '站姿，手掌抵住額頭/後腦/側面，頭用力頂手，手用力頂頭。 (Press hand against head and resist with neck muscles.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/17.mp4' },
    { id: 'e_e8', name: '牆壁天使 (Wall Angels)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '背貼牆站立，雙臂貼牆上下滑動，改善圓肩。 (Stand against wall, slide arms up and down against the wall.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/18.mp4' },
    { id: 'e_e9', name: '站姿W字 (Standing W)', duration: '15次 (15 reps)', sets: '3組 (3 sets)', instruction: '站立，雙臂舉起呈W字型，向後夾背，胸口挺出。 (Lift arms in a W shape, squeeze back, chest out.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/19.mp4' },
    { id: 'e_e10', name: '彈力帶面拉 (Face Pull)', duration: '12次 (12 reps)', sets: '3組 (3 sets)', instruction: '站姿，將彈力帶固定高處，雙手拉向面部，手肘向外打開。 (Pull band towards face, elbows out.)', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/20.mp4' }
  ],
   catCirculation: [
    { id: 'c_s1', name: '站姿腿後伸展 (Standing Hamstring)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '單腳跟著地，腳尖勾起，臀部向後坐，雙手輕扶大腿。 (One heel on ground, toes up, sit hips back, hands on thigh.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/21.MOV' },
    { id: 'c_s2', name: '扶椅股四頭肌 (Quad Stretch)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '站立扶椅背，一手抓同側腳踝向後提，膝蓋併攏。 (Stand, hold chair, pull one ankle back, knees together.)', equipment: 'chair', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/22.MOV' },
    { id: 'c_s3', name: '推牆小腿伸展 (Calf Stretch)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '雙手推牆，弓箭步，後腳跟踩死地板。 (Push wall, lunge position, keep back heel on floor.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/23.MOV' },
    { id: 'c_s4', name: '腳踝繞環 (Ankle Circles)', duration: '10圈/邊 (10 circles/side)', sets: '3組 (3 sets)', instruction: '單腳站立(可扶牆)，抬起一腳，腳尖畫大圈。 (Stand on one leg, lift the other and rotate ankle in circles.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/24.MOV' },
    { id: 'c_s5', name: '站姿4字伸展 (Standing Figure 4)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '手扶椅背或牆，將一腳腳踝置於另一腿膝蓋上，向下蹲坐。 (Hold chair, cross ankle over knee, sit down into a stretch.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/25.MOV' },
    { id: 'c_s6', name: '站姿體側伸展 (Side Reach)', duration: '15秒/邊 (15s/side)', sets: '3組 (3 sets)', instruction: '一手插腰，一手舉高向對側延伸，拉開肋骨。 (One hand on hip, reach other hand over to the side.)', equipment: 'bodyweight', type: 'stretch' },
    { id: 'c_s7', name: '手指張合 (Finger Spread)', duration: '15次 (15 reps)', sets: '3組 (3 sets)', instruction: '用力張開五指，再用力握拳，促進末梢循環。 (Spread fingers wide, then make a tight fist.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/27.MOV' },
    { id: 'c_s8', name: '手臂交叉伸展 (Shoulder Cross)', duration: '15秒/邊 (15s/side)', sets: '3組 (3 sets)', instruction: '一臂橫過胸前，另一手勾住拉向身體。 (Cross one arm over chest, pull with the other hand.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/28.MOV' },
    { id: 'c_s9', name: '弓箭步髖屈伸展 (Lunge Stretch)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '站姿弓箭步，後腿膝蓋微彎向下，骨盆前推。 (Lunge position, back knee down, push pelvis forward.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/29.MOV' },
    { id: 'c_s10', name: '足底伸展 (Plantar Stretch)', duration: '20秒 (20s)', sets: '3組 (3 sets)', instruction: '腳尖踩在台階邊緣或牆角，腳跟向下壓。 (Toes on step edge, press heel down to stretch sole.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/30.MOV' },
    { id: 'c_e1', name: '原地踏步 (Marching in Place)', duration: '1分鐘 (1 min)', sets: '3組 (3 sets)', instruction: '站立，背部挺直，雙臂自然擺動，大腿交替抬高至水平。 (Stand straight, swing arms, lift knees to hip height.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/31.MOV' },
    { id: 'c_e2', name: '站姿提踵 (Standing Calf Raises)', duration: '20次 (20 reps)', sets: '3組 (3 sets)', instruction: '站立，雙腳與肩同寬，墊起腳尖停留1秒，慢慢放下。 (Stand, feet shoulder-width, rise on toes, hold 1s, lower.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/32.MOV' },
    { id: 'c_e3', name: '站姿開合跳 (Low Impact Jacks)', duration: '20次 (20 reps)', sets: '3組 (3 sets)', instruction: '站立，單腳向側邊點地，雙手同時舉高，左右交替，不跳躍。 (Step to side, lift arms, alternate sides without jumping.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/33.MOV' },
    { id: 'c_e4', name: '半深蹲 (Half Squats)', duration: '15次 (15 reps)', sets: '3組 (3 sets)', instruction: '站立，臀部向後坐像是要坐椅子，膝蓋不超過腳尖，站起夾臀。 (Stand, sit back as if into a chair, keep knees behind toes.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/34.MOV' },
    { id: 'c_e5', name: '站姿後踢臀 (Butt Kicks)', duration: '30秒 (30s)', sets: '3組 (3 sets)', instruction: '站立，快速交替將腳跟踢向臀部，活躍大腿後側肌肉。 (Stand, alternate kicking heels to glutes.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/35.MOV' },
    { id: 'c_e6', name: '左右滑步 (Side Steps)', duration: '30秒 (30s)', sets: '3組 (3 sets)', instruction: '微蹲，向左跨一步併腳，再向右跨一步併腳，保持核心收緊。 (Slight squat, step side to side, keep core tight.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/36.MOV' },
    { id: 'c_e7', name: '站姿直拳 (Standing Punches)', duration: '30秒 (30s)', sets: '3組 (3 sets)', instruction: '站穩馬步，核心用力，雙手交替向前出拳。 (Stand firm, use core, punch forward alternately.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/37.MOV' },
    { id: 'c_e8', name: '高抬腿 (High Knees)', duration: '20秒 (20s)', sets: '3組 (3 sets)', instruction: '原地快速跑動，盡量將膝蓋抬高至腰部高度。 (Run in place, lift knees high to waist level.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/38.MOV' },
    { id: 'c_e9', name: '站姿划船 (Standing Row)', duration: '15次 (15 reps)', sets: '3組 (3 sets)', instruction: '雙腳踩住彈力帶，雙手拉向腰間。 (Step on band, pull handles to waist.)', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/39.MOV' },
    { id: 'c_e10', name: '模擬跳繩 (Shadow Jump Rope)', duration: '30秒 (30s)', sets: '3組 (3 sets)', instruction: '想像手持跳繩，手腕轉動，雙腳輕輕彈跳或墊腳尖。 (Imagine jumping rope, rotate wrists, jump lightly.)', equipment: 'bodyweight', type: 'exercise' }
  ],
   catStress: [
    { id: 's_s1', name: '站姿前彎 (Standing Forward Fold)', duration: '30秒 (30s)', sets: '3組 (3 sets)', instruction: '站立，膝蓋微彎，上半身放鬆向下垂，手抱手肘。 (Stand, knees slightly bent, relax upper body down, hold elbows.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/41.MOV' },
    { id: 's_s2', name: '站姿脊椎扭轉 (Standing Twist)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '站立，骨盆不動，上半身向左轉，視線看向後方。 (Stand, keep pelvis still, turn upper body to the left, look back.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/42.MOV' },
    { id: 's_s3', name: '站姿貓牛式 (Standing Cat-Cow)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '手扶大腿，吐氣拱背低頭，吸氣挺胸抬頭。 (Hands on thighs, exhale to arch back, inhale to lift chest.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/43.MOV' },
    { id: 's_s4', name: '側面頸部放鬆 (Ear to Shoulder)', duration: '15秒/邊 (15s/side)', sets: '3組 (3 sets)', instruction: '耳朵找肩膀，同側手輕扶頭部加壓，對側手下沉。 (Ear to shoulder, gently press head with hand, other hand down.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/44.MOV' },
    { id: 's_s5', name: '三頭肌伸展 (Triceps Stretch)', duration: '15秒/邊 (15s/side)', sets: '3組 (3 sets)', instruction: '手肘彎曲舉高，另一手輕壓手肘向後向下。 (Bend elbow high, gently press elbow back and down with other hand.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/45.MOV' },
    { id: 's_s6', name: '背部大擁抱 (Big Hug)', duration: '20秒 (20s)', sets: '3組 (3 sets)', instruction: '雙手交叉抱住自己肩膀，拱背，肩胛骨左右分開。 (Cross arms to hug shoulders, arch back to spread shoulder blades.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/46.mp4' },
    { id: 's_s7', name: '門框闊背肌 (Door Lat Stretch)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '手抓門框高處，臀部向後坐，拉伸腋下與側背。 (Hold door frame high, sit hips back to stretch lats.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/47.mp4' },
    { id: 's_s8', name: '手腕屈肌伸展 (Wrist Flexor)', duration: '15秒/邊 (15s/side)', sets: '3組 (3 sets)', instruction: '手臂伸直掌心向內，另一手輕壓手背。 (Extend arm, palm in, gently press back of hand.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/48.mp4' },
    { id: 's_s9', name: '相撲式蹲伸展 (Sumo Squat Stretch)', duration: '20秒 (20s)', sets: '3組 (3 sets)', instruction: '雙腳寬站，下蹲，雙手撐膝蓋內側，肩膀輪流下壓。 (Wide stance, squat, hands on inner knees, press shoulders down.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/49.mp4' },
    { id: 's_s10', name: '全身向上延伸 (Full Reach)', duration: '10秒 (10s)', sets: '3組 (3 sets)', instruction: '吸氣雙手十指交扣反掌向上推，墊腳尖，全身拉長。 (Inhale, interlace fingers, push up, rise on toes.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/50.mp4' },
    { id: 's_e1', name: '全身甩動 (Body Shaking)', duration: '1分鐘 (1 min)', sets: '3組 (3 sets)', instruction: '站立，全身放鬆，像果凍一樣抖動手腳和肩膀，釋放壓力。 (Stand, relax, shake limbs and shoulders like jelly.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/51.mp4' },
    { id: 's_e2', name: '站姿呼吸 (Standing Breath)', duration: '1分鐘 (1 min)', sets: '3組 (3 sets)', instruction: '站立，雙手隨吸氣上舉，隨吐氣下壓，配合深呼吸。 (Stand, lift arms on inhale, lower on exhale with deep breaths.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/52.mp4' },
    { id: 's_e3', name: '轉體甩手 (Torso Twist Arm Swing)', duration: '30次 (30 reps)', sets: '3組 (3 sets)', instruction: '雙腳站寬，左右轉動軀幹，讓雙臂自然甩打身體兩側。 (Wide stance, rotate torso, let arms swing naturally.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/53.mp4' },
    { id: 's_e4', name: '天地伸展 (Sky Reach)', duration: '20次 (20 reps)', sets: '3組 (3 sets)', instruction: '單手用力向天空抓取，左右交替，伸展側腹。 (Reach high for the sky, alternate hands to stretch sides.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/54.mp4' },
    { id: 's_e5', name: '彈力帶過頂 (Pass-Throughs)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '站姿，握寬彈力帶，直臂前後繞過頭頂，靈活肩關節。 (Hold band wide, rotate arms over head to front and back.)', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/55.mp4' },
    { id: 's_e6', name: '聳肩落下 (Drop Shrugs)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '用力聳肩3秒，瞬間完全放鬆落下，吐氣有聲。 (Shrug shoulders hard for 3s, then drop and exhale loudly.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/56.mp4' },
    { id: 's_e7', name: '輕拍經絡 (Meridian Tapping)', duration: '1分鐘 (1 min)', sets: '3組 (3 sets)', instruction: '用空拳輕輕拍打手臂外側、腿部外側和肩膀。 (Gently tap arms, legs, and shoulders with loose fists.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/57.mp4' },
    { id: 's_e8', name: '站姿畫圓 (Torso Circles)', duration: '10圈 (10 circles)', sets: '3組 (3 sets)', instruction: '雙手插腰，上半身大幅度畫圓，放鬆腰背。 (Hands on hips, rotate upper body in large circles.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/58.mp4' },
    { id: 's_e9', name: '握拳釋放 (Fist Clench)', duration: '5次 (5 reps)', sets: '3組 (3 sets)', instruction: '站立，全身用力繃緊(握拳/縮趾/皺眉)3秒，然後瞬間放鬆。 (Tense whole body for 3s, then release instantly.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/59.mp4' },
    { id: 's_e10', name: '正念步行 (Mindful Walk)', duration: '1分鐘 (1 min)', sets: '3組 (3 sets)', instruction: '在小空間極慢行走，專注腳底接觸地面的感覺。 (Walk very slowly, focus on the sensation of feet touching ground.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/60.mp4' }
  ],
   catCore: [
    { id: 'co_s1', name: '眼鏡蛇式 (Standing Cobra)', duration: '15秒 (15s)', sets: '3組 (3 sets)', instruction: '站姿雙手扶後腰，骨盆輕推前，胸口向天花板延展。 (Stand, hands on lower back, push pelvis forward, lift chest.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/61.mp4' },
    { id: 'co_s2', name: '站姿抱膝 (Standing Knee Hug)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '背靠牆站立，雙手抱住單腳膝蓋拉向胸口。 (Stand against wall, pull one knee to chest with both hands.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/62.mp4' },
    { id: 'co_s3', name: '側腰伸展 (Side Bend)', duration: '15秒/邊 (15s/side)', sets: '3組 (3 sets)', instruction: '站姿，雙手互握向上，身體向側邊彎曲。 (Stand, hold hands above head, bend body to the side.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/63.mp4' },
    { id: 'co_s4', name: '站姿翹腳伸展 (Standing Figure 4)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '手扶椅背，翹腳半蹲，伸展臀部與下背。 (Hold chair, cross one leg over the other, squat slightly.)', equipment: 'chair', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/64.mp4' },
    { id: 'co_s5', name: '腹部拉伸 (Ab Stretch)', duration: '15秒 (15s)', sets: '3組 (3 sets)', instruction: '雙手高舉過頭，墊腳尖，盡量將腹部線條拉長。 (Reach arms high, rise on toes, stretch your abdominal area.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/65.mp4' },
    { id: 'co_s6', name: '站姿腰方肌伸展 (Standing QL)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '雙腳交叉站，後腳側的手舉高向對側彎曲。 (Cross legs, reach high with the arm on the back leg side.)', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_s7', name: '骨盆時鐘 (Pelvic Tilts)', duration: '10次 (10 reps)', sets: '3組 (3 sets)', instruction: '站姿，膝蓋微彎，控制骨盆前傾與後傾，活動腰椎。 (Stand, knees slightly bent, tilt pelvis forward and back.)', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_s8', name: '扶椅闊背肌延展 (Lat Stretch)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '雙手扶椅背，身體後退下壓，背部打平。 (Hands on chair, step back and press down, keep back flat.)', equipment: 'chair', type: 'stretch' },
    { id: 'co_s9', name: '大轉子伸展 (IT Band)', duration: '20秒/邊 (20s/side)', sets: '3組 (3 sets)', instruction: '站姿雙腳交叉，身體向後腳側彎曲。 (Stand with legs crossed, bend body towards the back leg side.)', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_s10', name: '髖部畫圓 (Hip Circles)', duration: '10圈 (10 circles)', sets: '3組 (3 sets)', instruction: '站姿雙手插腰，像搖呼拉圈一樣轉動骨盆。 (Hands on hips, rotate pelvis in circles like using a hula hoop.)', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_e1', name: '站姿提膝觸肘 (Standing Knee to Elbow)', duration: '12次 (12 reps)', sets: '3組 (3 sets)', instruction: '站立，雙手抱頭，對側膝蓋與手肘相觸，擠壓側腹。 (Stand, hands behind head, touch opposite knee to elbow.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/71.MOV' },
    { id: 'co_e2', name: '抗旋推舉 (Pallof Press)', duration: '10次/邊 (10 reps/side)', sets: '3組 (3 sets)', instruction: '站姿，側對彈力帶固定點，雙手握帶推向正前方抗旋轉。 (Stand, hold band from side, press forward to resist rotation.)', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/72.MOV' },
    { id: 'co_e3', name: '站姿早安式 (Good Mornings)', duration: '12次 (12 reps)', sets: '3組 (3 sets)', instruction: '雙手抱頭，保持背部打直，臀部向後推，上半身前傾。 (Hands behind head, keep back straight, push hips back.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/73.MOV' },
    { id: 'co_e4', name: '單腳站立平衡 (Single Leg Balance)', duration: '30秒/邊 (30s/side)', sets: '3組 (3 sets)', instruction: '單腳站立，另一腳離地，保持骨盆水平，核心收緊。 (Stand on one leg, keep pelvis level, tighten core.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/74.MOV' },
    { id: 'co_e5', name: '站姿交叉爬行 (Cross Crawl)', duration: '20次 (20 reps)', sets: '3組 (3 sets)', instruction: '站立，右手拍左膝，左手拍右膝，交替進行，動作誇張。 (Stand, touch right hand to left knee, then left hand to right knee.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/75.MOV' },
    { id: 'co_e6', name: '伐木動作 (Woodchoppers)', duration: '10次/邊 (10 reps/side)', sets: '3組 (3 sets)', instruction: '踩住彈力帶，雙手握帶由下往對側上方斜拉旋轉。 (Step on band, pull diagonally from low to high.)', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/76.mp4?updatedAt=1771422639237' },
    { id: 'co_e7', name: '風車觸足 (Standing Windmill)', duration: '20次 (20 reps)', sets: '3組 (3 sets)', instruction: '雙腳寬站，雙手平舉，右手觸左腳尖，左手觸右腳尖。 (Wide stance, arms out, touch opposite foot with hand.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/77.mp4?updatedAt=1771422640415' },
    { id: 'co_e8', name: '站姿後抬腿 (Standing Glute Kickback)', duration: '15次/邊 (15 reps/side)', sets: '3組 (3 sets)', instruction: '手扶牆，單腳向後上方抬起，收緊臀部，腰不塌。 (Hold wall, kick one leg back and up, squeeze glutes.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/78.mp4?updatedAt=1771422640916' },
    { id: 'co_e9', name: '站姿鳥狗式 (Standing Bird Dog)', duration: '10次/邊 (10 reps/side)', sets: '3組 (3 sets)', instruction: '站立，對側手腳同時向前後延伸抬起，保持平衡。 (Stand, extend opposite arm and leg, maintain balance.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/79.mp4?updatedAt=1771422640648' },
    { id: 'co_e10', name: '側向抬腿 (Side Leg Raise)', duration: '12次/邊 (12 reps/side)', sets: '3組 (3 sets)', instruction: '站立扶牆，單腿向外側抬起，身體不歪斜，訓練臀中肌。 (Hold wall, lift one leg to the side, keep body straight.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/80.mp4?updatedAt=1771422640424' }
  ],
   catSleep: [
    { id: 'sl_s1', name: '椅上抬腿 (Legs on Chair)', duration: '3分鐘 (3 mins)', sets: '1組 (1 set)', instruction: '躺地，小腿置於椅面，放鬆腰背，促進回流。 (Lie down, place calves on chair, relax lower back.)', equipment: 'chair', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/81.mp4' },
    { id: 'sl_s2', name: '蝴蝶式 (Cobbler Pose)', duration: '2分鐘 (2 mins)', sets: '1組 (1 set)', instruction: '坐姿腳掌相對，膝蓋自然打開，放鬆髖內側。 (Sit, soles together, knees out, relax inner hips.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/82.mp4' },
    { id: 'sl_s3', name: '快樂嬰兒 (Happy Baby)', duration: '1分鐘 (1 min)', sets: '1組 (1 set)', instruction: '躺姿屈膝，手抓腳板外側，膝蓋找腋下，左右搖擺。 (Lie down, hold feet, pull knees to armpits, rock side to side.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/83.mp4' },
    { id: 'sl_s4', name: '仰臥脊椎扭轉 (Supine Twist)', duration: '1分鐘/邊 (1 min/side)', sets: '1組 (1 set)', instruction: '躺姿，單腿屈膝跨過身體倒向對側，頭看反向。 (Lie down, cross one knee over body, look the opposite way.)', equipment: 'bodyweight', type: 'stretch' },
    { id: 'sl_s5', name: '仰臥抱腿 (Wind Removing)', duration: '1分鐘 (1 min)', sets: '1組 (1 set)', instruction: '躺姿抱雙膝壓向腹部，輕輕左右滾動按摩背部。 (Lie down, hug knees to chest, rock side to side.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/85.mp4' },
    { id: 'sl_s6', name: '大休息式 (Corpse Pose)', duration: '3分鐘 (3 mins)', sets: '1組 (1 set)', instruction: '全身平躺，手腳自然攤開，完全放鬆每一寸肌肉。 (Lie flat, arms and legs out, relax every muscle.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/86.mp4' },
    { id: 'sl_s7', name: '頸部畫圓 (Neck Rolls)', duration: '1分鐘 (1 min)', sets: '1組 (1 set)', instruction: '極慢速度轉動頭部，尋找緊繃點停留呼吸。 (Rotate head very slowly, breathe into tight spots.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/87.mp4' },
    { id: 'sl_s8', name: '腿後伸展躺姿 (Hamstring)', duration: '30秒/邊 (30s/side)', sets: '1組 (1 set)', instruction: '躺姿，用毛巾或彈力帶勾住足底，將腿拉直向上。 (Lie down, use towel/band to pull leg straight up.)', equipment: 'band', type: 'stretch' },
    { id: 'sl_s9', name: '開胸魚式 (Supported Fish)', duration: '2分鐘 (2 mins)', sets: '1組 (1 set)', instruction: '在背後肩胛骨處墊枕頭或瑜珈磚，躺下開胸。 (Place pillow under shoulder blades, lie down to open chest.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/89.mp4' },
    { id: 'sl_s10', name: '手腳腕轉動 (Joint Freeing)', duration: '1分鐘 (1 min)', sets: '1組 (1 set)', instruction: '躺在床上，舉起手腳，緩慢轉動手腕腳踝。 (Lie down, lift hands and feet, rotate wrists and ankles.)', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/90.mp4' },
    { id: 'sl_e1', name: '4-7-8 呼吸 (4-7-8 Breath)', duration: '4循環 (4 cycles)', sets: '1組 (1 set)', instruction: '吸氣4秒，憋氣7秒，嘴巴吐氣8秒，可站可臥。 (Inhale 4s, hold 7s, exhale 8s.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/91.mp4' },
    { id: 'sl_e2', name: '站姿放鬆前彎 (Ragdoll)', duration: '1分鐘 (1 min)', sets: '1組 (1 set)', instruction: '站立膝蓋彎，身體前掛，互抱手肘，像布娃娃一樣左右輕晃。 (Stand, bend knees, hang upper body, hold elbows, sway.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/92.mp4' },
    { id: 'sl_e3', name: '輕柔搖擺 (Gentle Sway)', duration: '2分鐘 (2 mins)', sets: '1組 (1 set)', instruction: '站立，雙腳寬於肩，輕輕左右轉動身體，手臂隨之擺動。 (Stand, feet wide, rotate body gently, let arms swing.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/93.mp4' },
    { id: 'sl_e4', name: '漸進放鬆 (PMR)', duration: '5分鐘 (5 mins)', sets: '1組 (1 set)', instruction: '從腳趾到頭頂，依序用力緊繃肌肉5秒再放鬆。 (Tense and release muscles from toes to head.)', equipment: 'bodyweight', type: 'exercise' },
    { id: 'sl_e5', name: '身體掃描 (Body Scan)', duration: '3分鐘 (3 mins)', sets: '1組 (1 set)', instruction: '閉眼，意識掃過全身各部位，感受並放鬆。 (Close eyes, scan body parts and relax them.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/95.mp4' },
    { id: 'sl_e6', name: '月亮呼吸 (Left Nostril)', duration: '2分鐘 (2 mins)', sets: '1組 (1 set)', instruction: '按住右鼻孔，只用左鼻孔緩慢呼吸，啟動副交感神經。 (Breathe through left nostril only to relax.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/96(1).mp4' },
    { id: 'sl_e7', name: '數息法 (Counting)', duration: '2分鐘 (2 mins)', sets: '1組 (1 set)', instruction: '專注呼吸，吸氣數1，吐氣數2，數到10再重來。 (Count breaths from 1 to 10 and repeat.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/97.mp4' },
    { id: 'sl_e8', name: '腿部靠牆 (Legs Up Wall)', duration: '5分鐘 (5 mins)', sets: '1組 (1 set)', instruction: '臀部貼牆，雙腳向上伸直靠牆，促進血液回流放鬆。 (Rest legs vertically against a wall to relax.)', equipment: 'bodyweight', type: 'exercise' },
    { id: 'sl_e9', name: '下顎放鬆 (Jaw Release)', duration: '1分鐘 (1 min)', sets: '1組 (1 set)', instruction: '張大嘴巴發出「啊」聲，左右移動下巴，放鬆咬肌。 (Open mouth wide, move jaw side to side.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/99.mp4' },
    { id: 'sl_e10', name: '感恩回想 (Gratitude)', duration: '2分鐘 (2 mins)', sets: '1組 (1 set)', instruction: '回想今天發生的3件好事，帶著正向情緒入睡。 (Recall 3 good things from today before sleep.)', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/100.mp4' }
  ],
};

// --- Logo Component ---
const AppLogo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const dim = size === "lg" ? "w-20 h-20" : size === "md" ? "w-12 h-12" : "w-10 h-10";
  const iconSize = size === "lg" ? 36 : size === "md" ? 22 : 18;
  const radius = size === "lg" ? "rounded-[30%]" : "rounded-[25%]";

  return (
    <div className={`relative ${dim} flex items-center justify-center animate-logo-magnetic group`}>
      <div className="particle top-0 left-0" style={{ animationDelay: '0s' }}></div>
      <div className="particle bottom-2 right-0" style={{ animationDelay: '0.8s' }}></div>
      <div className="particle top-2 right-2" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-500 rounded-full animate-logo-glow-complex blur-xl"></div>
      <div className="absolute inset-1 rounded-full border border-white/30 animate-pulse"></div>
      <div className={`relative h-full w-full bg-slate-950/90 backdrop-blur-md ${radius} border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden`}>
        <div className="shimmer-layer"></div>
        <div className="animate-heartbeat flex items-center justify-center">
            <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" size={iconSize} />
        </div>
      </div>
    </div>
  );
};

// --- ProgressBar Component ---
const ProgressBar = ({ label, current, target, unit }: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));

  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{label}</span>
        <span className="text-[10px] font-bold opacity-80">{Math.round(current)} / {Math.round(target)}{unit}</span>
      </div>
      <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-1000 ease-out rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// --- REAL RECIPE DATA (300 items) ---
const breakfastNames = [
    "牛奶燕麥粥 (Milk Oatmeal)", "雞蛋全麥三文治 (Egg Whole Wheat Sandwich)", "香蕉花生醬多士 (Banana Peanut Butter Toast)", "蒸紅薯配水煮蛋 (Steamed Sweet Potato with Boiled Egg)", "蔬菜雞肉粥 (Vegetable Chicken Porridge)",
    "希臘乳酪拌堅果 (Greek Yogurt with Nuts)", "火腿芝士蛋卷 (Ham and Cheese Omelet)", "番茄通粉 (Tomato Macaroni)", "無糖豆漿配饅頭 (Sugar-free Soy Milk with Steamed Bun)", "牛油果吐司 (Avocado Toast)",
    "藍莓燕麥碗 (Blueberry Oatmeal Bowl)", "肉碎湯米粉 (Minced Pork Rice Noodle Soup)", "蒸玉米配牛奶 (Steamed Corn with Milk)", "吞拿魚沙律 (Tuna Salad)", "蔥花雞蛋餅 (Green Onion Egg Pancake)",
    "南瓜小米粥 (Pumpkin Millet Porridge)", "全麥貝果配忌廉芝士 (Whole Wheat Bagel with Cream Cheese)", "蘑菇菠菜歐姆蛋 (Mushroom Spinach Omelet)", "蘋果肉桂麥片 (Apple Cinnamon Cereal)", "烚蛋配西蘭花 (Boiled Egg with Broccoli)",
    "奇亞籽布丁 (Chia Seed Pudding)", "紫薯泥 (Purple Sweet Potato Mash)", "紅豆薏米粥 (Red Bean Barley Porridge)", "糙米飯糰 (Brown Rice Ball)", "雞胸肉捲餅 (Chicken Breast Wrap)",
    "低脂牛奶玉米片 (Low Fat Milk Cornflakes)", "鮮蝦雲吞湯 (Shrimp Wonton Soup)", "菠菜蒸蛋 (Steamed Egg with Spinach)", "烤南瓜片 (Roasted Pumpkin Slices)", "青瓜火腿治 (Cucumber Ham Sandwich)",
    "香煎豆腐 (Pan-fried Tofu)", "黑芝麻糊 (Black Sesame Soup)", "紅棗桂圓茶配蛋 (Red Date Tea with Egg)", "雜果沙律 (Mixed Fruit Salad)", "全麥鬆餅 (Whole Wheat Muffin)",
    "番茄炒蛋配麵包 (Tomato Egg with Bread)", "清湯烏冬 (Clear Soup Udon)", "蒸燒賣(蝦仁) (Steamed Shrimp Siu Mai)", "味噌湯配飯 (Miso Soup with Rice)", "燕麥曲奇 (Oatmeal Cookie)",
    "蛋白棒配水果 (Protein Bar with Fruit)", "豬肉白菜餃子 (Pork Cabbage Dumplings)", "生菜魚肉湯 (Lettuce Fish Soup)", "腐竹白果粥 (Beancurd Ginkgo Porridge)", "雜菌意粉 (Mixed Mushroom Pasta)",
    "雞肉凱撒沙律捲 (Chicken Caesar Wrap)", "低糖綠豆沙 (Low Sugar Mung Bean Soup)", "蒸芋頭 (Steamed Taro)", "鮮奶燉蛋白 (Steamed Egg White with Milk)", "芝麻醬拌麵 (Sesame Sauce Noodles)",
    "肉鬆夾心吐司 (Pork Floss Toast)", "香蕉奶昔 (Banana Milkshake)", "紅蘿蔔蛋糕(低糖) (Low Sugar Carrot Cake)", "西柚蜂蜜茶配蛋 (Grapefruit Honey Tea with Egg)", "麥皮蝦 (Oatmeal Shrimp)",
    "冬菇滑雞粥 (Shiitake Chicken Porridge)", "煙三文魚多士 (Smoked Salmon Toast)", "粟米肉粒飯(小碗) (Corn Pork Rice - Small)", "蒸蘿蔔糕 (Steamed Radish Cake)", "烚菜心配蠔油 (Boiled Choy Sum with Oyster Sauce)",
    "酸奶水果杯 (Yogurt Fruit Cup)", "核桃露 (Walnut Soup)", "皮蛋瘦肉粥 (Century Egg Pork Porridge)", "雪耳燉梨 (Snow Ear Stewed Pear)", "烤雞翼配沙律 (Roasted Chicken Wings with Salad)",
    "藜麥水果沙律 (Quinoa Fruit Salad)", "全麥雞肉捲 (Whole Wheat Chicken Wrap)", "南瓜蒸蛋 (Steamed Egg with Pumpkin)", "紫薯牛奶 (Purple Sweet Potato Milk)", "低脂芝士蛋餅 (Low Fat Cheese Omelet)",
    "魚片粥 (Fish Slice Porridge)", "艇仔粥 (Ting Zai Porridge)", "及第粥 (Ji Di Porridge)", "蒸腸粉 (Steamed Rice Noodle Roll)", "五穀飯糰 (Five Grain Rice Ball)",
    "銀絲卷 (Silver Thread Roll)", "馬拿糕 (Ma Lai Go)", "潮州粉果 (Chiu Chow Fun Gor)", "鮮蝦餃 (Shrimp Dumpling)", "小籠包 (Xiao Long Bao)",
    "蒸玉米 (Steamed Corn)", "蒸紅薯 (Steamed Sweet Potato)", "蒸南瓜 (Steamed Pumpkin)", "蒸山藥 (Steamed Yam)", "蒸芋頭 (Steamed Taro)",
    "豬骨粥 (Pork Bone Porridge)", "柴魚花生粥 (Dried Fish Peanut Porridge)", "白粥配肉鬆 (Plain Porridge with Pork Floss)", "豆沙包 (Red Bean Bun)", "奶黃包 (Custard Bun)",
    "蓮蓉包 (Lotus Seed Bun)", "全麥饅頭 (Whole Wheat Steamed Bun)", "低糖蛋撻 (Low Sugar Egg Tart)", "全麥提子包 (Whole Wheat Raisin Bun)", "低脂雞尾包 (Low Fat Cocktail Bun)",
    "低脂腸仔包 (Low Fat Sausage Bun)", "低脂吞拿魚包 (Low Fat Tuna Bun)", "腿蛋治 (Ham Egg Sandwich)", "鮮牛治 (Beef Sandwich)", "公司三文治 (Club Sandwich)"
];

const lunchNames = [
    "海南雞飯 (Hainan Chicken Rice)", "番茄蛋飯 (Tomato Egg Rice)", "咖哩雞飯 (Curry Chicken Rice)", "肉燥飯 (Minced Pork Rice)", "日式牛丼 (Japanese Beef Bowl)",
    "豬扒飯 (Pork Chop Rice)", "魚香茄子飯 (Eggplant with Minced Pork Rice)", "麻婆豆腐飯 (Mapo Tofu Rice)", "滑蛋蝦仁飯 (Shrimp Scrambled Egg Rice)", "清湯牛腩麵 (Clear Soup Beef Brisket Noodles)",
    "烤三文魚配糙米飯 (Grilled Salmon with Brown Rice)", "雲吞麵 (Wonton Noodles)", "牛腩麵 (Beef Brisket Noodles)", "魚蛋粉 (Fish Ball Rice Noodles)", "墨丸河 (Cuttlefish Ball Rice Noodles)",
    "雞胸肉蕎麥麵 (Chicken Breast Soba Noodles)", "上海粗麵 (Shanghai Thick Noodles)", "豆腐蔬菜湯飯 (Tofu Veggie Soup Rice)", "水餃麵 (Dumpling Noodles)", "雞絲粉皮 (Shredded Chicken with Bean Starch Sheets)",
    "紅燒牛肉麵", "清湯腩河", "粟米班塊飯", "西芹雞柳飯", "菜遠排骨飯",
    "涼瓜牛肉飯", "芙蓉蛋飯", "鹹魚雞粒炒飯", "揚州炒飯", "福建炒飯",
    "豉椒排骨飯", "梅菜扣肉飯", "蔥油雞飯", "白切雞飯", "燒鴨飯",
    "油雞飯", "叉燒飯", "燒肉飯", "燻蹄飯", "五寶飯",
    "回鍋肉飯", "宮保雞丁飯", "酸甜排骨飯", "京都骨飯", "西檸雞飯",
    "菠蘿咕嚕肉飯", "椒鹽豬扒飯", "粟米肉粒飯", "窩蛋牛肉飯", "柱侯牛腩飯",
    "咖哩牛腩飯", "沙爹牛肉飯", "黑椒牛柳絲飯", "中式牛柳飯", "蒜香骨飯",
    "生炒骨飯", "枝竹火腩飯", "豆腐火腩飯", "粟米魚肚羹飯", "羅漢齋飯",
    "鮮茄牛肉飯", "鮮茄豬扒飯", "焗豬扒飯", "焗肉醬意粉", "焗海鮮飯",
    "白汁雞皇飯", "葡國雞飯", "黑椒雞扒飯", "蒜蓉雞扒飯", "香茅豬扒飯",
    "越式生牛肉河", "越式香茅雞肉檬", "泰式炒金邊粉", "泰式海南雞飯", "泰式豬手飯",
    "泰式綠咖哩雞飯", "泰式紅咖哩牛飯", "日式滑蛋雞肉飯", "日式叉燒拉麵", "日式豬骨拉麵",
    "日式味噌拉麵", "日式咖哩豬扒飯", "日式天婦羅飯", "韓式拌飯", "韓式泡菜炒飯",
    "韓式炒年糕", "韓式部隊鍋(一人)", "韓式人蔘雞湯飯", "台式滷肉飯", "台式雞肉飯",
    "台式牛肉麵", "台式排骨飯", "台式三杯雞飯", "台式鹽酥雞飯", "意式肉醬意粉",
    "卡邦尼意粉", "蒜香辣椒意粉", "青醬雞肉意粉", "海鮮蕃茄意粉"
];

const dinnerNames = [
    "清蒸鱸魚 (Steamed Sea Bass)", "番茄炒蛋 (Scrambled Eggs with Tomato)", "土豆燉牛肉 (Beef Stew with Potatoes)", "蒜蓉炒菜心 (Sautéed Choy Sum with Garlic)", "西蘭花炒雞片 (Stir-fried Chicken with Broccoli)",
    "蒸水蛋 (Steamed Egg Custard)", "冬瓜豆腐湯 (Winter Melon Tofu Soup)", "粟米紅蘿蔔湯 (Corn and Carrot Soup)", "涼拌黑木耳 (Cold Black Fungus Salad)", "西洋菜湯 (Watercress Soup)",
    "青紅蘿蔔豬骨湯 (Green and Red Carrot Pork Bone Soup)", "蓮藕章魚湯 (Lotus Root and Octopus Soup)", "粉葛鯪魚湯 (Arrowroot and Mud Carp Soup)", "花旗參雞湯 (American Ginseng Chicken Soup)", "蟲草花蒸雞 (Steamed Chicken with Cordyceps Flower)",
    "冬菇蒸雞 (Steamed Chicken with Mushrooms)", "雲耳蒸雞 (Steamed Chicken with Cloud Ear Fungus)", "南瓜蒸排骨 (Steamed Pork Ribs with Pumpkin)", "豉汁蒸排骨 (Steamed Pork Ribs with Black Bean Sauce)", "梅菜蒸肉餅 (Steamed Pork Patty with Preserved Vegetables)",
    "鹹蛋蒸肉餅", "土魷蒸肉餅", "香煎芙蓉蛋", "蝦仁炒蛋", "苦瓜炒蛋",
    "節瓜粉絲蝦米煲", "魚香茄子煲", "豆腐火腩煲", "枝竹羊腩煲", "蘿蔔牛腩煲",
    "西蘭花炒帶子", "西芹炒魷魚", "荷蘭豆炒臘味", "蒜蓉蒸蝦", "白灼蝦",
    "豉油皇蝦", "薑蔥炒蟹", "清蒸石斑", "清蒸多寶魚", "紅燒魚",
    "糖醋魚塊", "粟米斑塊", "椒鹽鮮魷", "酥炸生蠔", "薑蔥生蠔",
    "西檸軟雞", "檸檬雞翼", "瑞士雞翼", "滷水雞翼", "滷水雞髀",
    "滷水鵝片", "滷水墨魚", "紅腸墨魚", "生炒排骨", "京都肉排",
    "椒鹽排骨", "鎮江骨", "蜜椒骨", "咕嚕肉", "賽螃蟹",
    "大良炒鮮奶", "滑蛋牛肉", "菜遠炒牛肉", "西芹炒雞柳", "腰果雞丁",
    "宮保雞丁", "辣子雞", "口水雞", "霸王雞", "鹽焗雞",
    "蔥油雞", "手撕雞", "醉雞", "麻油雞", "三杯雞",
    "螞蟻上樹", "魚香肉絲", "回鍋肉", "水煮牛肉", "水煮魚",
    "酸菜魚", "乾煸四季豆", "虎皮尖椒", "蒜泥白肉", "紅油抄手",
    "清炒時蔬", "上湯浸豆苗", "金銀蛋菠菜", "蒜蓉西蘭花", "蠔油生菜",
    "腐乳通菜", "蝦醬通菜", "清炒菜心", "清炒芥蘭", "薑汁炒芥蘭",
    "蒜蓉蒸絲瓜", "老少平安", "蒸釀豆腐", "煎釀三寶", "琵琶豆腐"
];

// Helper to generate detailed recipe data
const getRecipeDetails = (name: string, category: string, currentLang: 'zh' | 'en') => {
  let ingredients = "";
  let method = [];

  const dishName = currentLang === 'zh' ? name.split(' (')[0] : (name.match(/\(([^)]+)\)/)?.[1] || name);

  if (category === 'breakfast') {
    ingredients = currentLang === 'zh' 
      ? `• 主食 (${dishName.split('配')[0] || dishName.substring(0,2)}): 1份 (約150g)\n• 雞蛋: 1隻\n• 牛奶/豆漿: 200ml\n• 新鮮水果: 1份 (約80g)`
      : `• Main (${dishName.split(' with ')[0] || dishName.substring(0,5)}): 1 portion (~150g)\n• Egg: 1 pc\n• Milk/Soy Milk: 200ml\n• Fresh Fruit: 1 portion (~80g)`;
    method = currentLang === 'zh' ? [
      "1. 將食材洗淨，準備好烹飪用具。",
      `2. 根據個人口味烹調${dishName}，注意火候。`,
      "3. 搭配一杯熱牛奶或豆漿。",
      "4. 最後切好水果擺盤，享受營養早餐。"
    ] : [
      "1. Wash ingredients and prepare cooking tools.",
      `2. Cook ${dishName} according to personal taste.`,
      "3. Serve with a glass of hot milk or soy milk.",
      "4. Slice fruit for plating and enjoy your breakfast."
    ];
  } else {
    // Lunch/Dinner
    if (name.includes('飯') || name.includes('Rice')) {
      ingredients = currentLang === 'zh'
        ? `• 白飯/糙米飯: 1碗 (約180g)\n• 主菜 (${dishName.replace('飯','') || '肉類'}): 150g\n• 時令蔬菜: 100g\n• 植物油: 1茶匙\n• 薑蔥蒜: 適量`
        : `• Rice/Brown Rice: 1 bowl (~180g)\n• Main (${dishName.replace(' Rice','') || 'Protein'}): 150g\n• Seasonal Veggies: 100g\n• Oil: 1 tsp\n• Ginger/Garlic: to taste`;
      method = currentLang === 'zh' ? [
        "1. 洗淨米放入電飯煲煮熟。",
        `2. 將${dishName.replace('飯','')}切件，蔬菜洗淨瀝乾。`,
        "3. 熱鍋下油，先炒熟主菜，再加入蔬菜快炒。",
        "4. 加入少許鹽或醬油調味，盛起鋪在飯面上。"
      ] : [
        "1. Wash rice and cook in a rice cooker.",
        `2. Cut ${dishName.replace(' Rice','')} into pieces, wash veggies.`,
        "3. Heat oil, stir-fry main dish, then add veggies.",
        "4. Season with salt or soy sauce and serve over rice."
      ];
    } else if (name.includes('麵') || name.includes('粉') || name.includes('Noodle') || name.includes('Pasta')) {
      ingredients = currentLang === 'zh'
        ? `• 麵條/意粉: 1束 (約100g乾重)\n• 配料 (${dishName.replace(/[麵粉]|意粉/g,'') || '肉絲'}): 100g\n• 高湯/醬汁: 200ml\n• 青菜: 50g`
        : `• Noodles/Pasta: 1 bundle (~100g dry)\n• Toppings (${dishName.replace(/Noodles|Pasta/g,'') || 'Protein'}): 100g\n• Broth/Sauce: 200ml\n• Veggies: 50g`;
      method = currentLang === 'zh' ? [
        "1. 燒一鍋水，水滾後放入麵條煮至彈牙。",
        "2. 另起鍋處理配料，煮熟或炒香。",
        "3. 加入高湯或醬汁煮滾，放入麵條吸收湯汁。",
        "4. 加入青菜燙熟，即可上碗享用。"
      ] : [
        "1. Boil water and cook noodles until al dente.",
        "2. Prepare toppings in a separate pan.",
        "3. Add broth/sauce, bring to boil, add noodles.",
        "4. Blanch veggies and serve in a bowl."
      ];
    } else {
      ingredients = currentLang === 'zh'
        ? `• 主要食材 (${dishName}): 200g\n• 配料 (蔥/薑/蒜): 適量\n• 調味料: 適量\n• 食用油: 1湯匙`
        : `• Main Ingredient (${dishName}): 200g\n• Aromatics: to taste\n• Seasoning: to taste\n• Oil: 1 tbsp`;
      method = currentLang === 'zh' ? [
        `1. 將${dishName}的主料處理乾淨，切成適口大小。`,
        "2. 準備佐料（薑片、蔥段等）。",
        "3. 熱鍋下油，爆香佐料，放入主料烹煮。",
        "4. 確認食材完全熟透，調味後即可上碟。"
      ] : [
        `1. Clean and cut ${dishName} into bite-sized pieces.`,
        "2. Prepare aromatics (ginger, scallions, etc.).",
        "3. Heat oil, sauté aromatics, then cook main ingredient.",
        "4. Ensure it's fully cooked, season, and serve."
      ];
    }
  }
  return { ingredients, method };
};

const ALL_RECIPES: any[] = [
    // Breakfast items (100)
    ...breakfastNames.map((name, i) => ({
        id: `br-${i}`, name, category: 'breakfast' as const, emoji: '🥣', 
        calories: 200 + (i % 7)*45 + Math.floor(Math.random() * 30), 
        protein: 8 + (i % 6)*3, 
        carbs: 25 + (i % 8)*5, 
        fat: 4 + (i % 5)*2,
        saturatedFat: parseFloat((0.5 + (i % 4) * 0.5).toFixed(1)),
        transFat: 0,
        sodium: 150 + (i % 12) * 25,
        sugar: 2 + (i % 10) * 1.5
    })),
    // Lunch items (100)
    ...lunchNames.map((name, i) => ({
        id: `lu-${i}`, name, category: 'lunch' as const, emoji: '🍛', 
        calories: 400 + (i % 12)*35 + Math.floor(Math.random() * 50), 
        protein: 18 + (i % 8)*4, 
        carbs: 45 + (i % 10)*6, 
        fat: 10 + (i % 7)*3,
        saturatedFat: parseFloat((2 + (i % 5) * 0.8).toFixed(1)),
        transFat: parseFloat((0.05 * (i % 3)).toFixed(1)),
        sodium: 400 + (i % 15) * 40,
        sugar: 1 + (i % 8) * 1.2
    })),
    // Dinner items (100)
    ...dinnerNames.map((name, i) => ({
        id: `di-${i}`, name, category: 'dinner' as const, emoji: '🍲', 
        calories: 350 + (i % 10)*40 + Math.floor(Math.random() * 40), 
        protein: 22 + (i % 9)*3, 
        carbs: 30 + (i % 12)*4, 
        fat: 8 + (i % 6)*3,
        saturatedFat: parseFloat((1.5 + (i % 4) * 0.7).toFixed(1)),
        transFat: 0,
        sodium: 350 + (i % 12) * 35,
        sugar: 1 + (i % 6) * 1
    }))
];

const FOOD_DATABASE: FoodDatabaseItem[] = [
  { id: 'v1', name: '西蘭花 (Broccoli)', category: '蔬菜 (Veggies)', emoji: '🥦', calories: 35, protein: 2.8, carbs: 7, fat: 0.4, ingredients: '西蘭花', method: ['水煮', '炒'] },
  { id: 'f1', name: '蘋果 (Apple)', category: '水果 (Fruits)', emoji: '🍎', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, ingredients: '蘋果', method: ['直接食用'] },
  ...Array.from({ length: 20 }).map((_, i) => ({ id: `gen-${i}`, name: `食物 ${i} (Food ${i})`, category: '即食食物 (Ready-to-eat)', emoji: '🍱', calories: 300, protein: 10, carbs: 40, fat: 10, ingredients: '一般食材', method: ['即食'] }))
];

// --- NUVISION DATA GENERATION ---
const generateNuVisionItems = (lang: 'zh' | 'en') => {
  const GRAIN_NAMES = [
    "白米 (White Rice)", "糙米 (Brown Rice)", "紅米 (Red Rice)", "黑米 (Black Rice)", "糯米 (Glutinous Rice)",
    "珍珠米 (Pearl Rice)", "絲苗米 (Jasmine Rice)", "油粘米 (Oil Rice)", "壽司米 (Sushi Rice)", "五穀米 (Five Grain Rice)",
    "十穀米 (Ten Grain Rice)", "燕麥 (Oats)", "即食燕麥 (Instant Oats)", "麥皮 (Oatmeal)", "藜麥 (Quinoa)",
    "小米 (Millet)", "大麥 (Barley)", "小麥 (Wheat)", "蕎麥 (Buckwheat)", "薏米 (Job's Tears)",
    "全麥麵包 (Whole Wheat Bread)", "白麵包 (White Bread)", "方包 (Sliced Bread)", "麥包 (Wheat Bun)", "提子包 (Raisin Bun)",
    "菠蘿包 (Pineapple Bun)", "雞尾包 (Cocktail Bun)", "腸仔包 (Sausage Bun)", "吞拿魚包 (Tuna Bun)", "叉燒包 (BBQ Pork Bun)",
    "法包 (Baguette)", "牛角包 (Croissant)", "貝果 (Bagel)", "英式鬆餅 (English Muffin)", "米粉 (Rice Vermicelli)",
    "河粉 (Flat Rice Noodles)", "通粉 (Macaroni)", "意粉 (Spaghetti)", "烏冬 (Udon)", "拉麵 (Ramen)",
    "公仔麵 (Instant Noodles)", "米線 (Mixian)", "粉絲 (Glass Noodles)", "饅頭 (Steamed Bun)", "餃子 (Dumplings)", "雲吞 (Wonton)", "燒賣 (Siu Mai)", "蝦餃 (Har Gow)", "糯米雞 (Sticky Rice in Lotus Leaf)", "腸粉 (Rice Noodle Roll)"
  ];

  const MEAT_NAMES = [
    "雞胸 (Chicken Breast)", "雞腿 (Chicken Leg)", "雞翼 (Chicken Wing)", "雞蛋 (Egg)", "牛肉 (Beef)",
    "肥牛 (Fatty Beef)", "牛腩 (Beef Brisket)", "牛扒 (Beef Steak)", "豬肉 (Pork)", "豬扒 (Pork Chop)",
    "豬頸肉 (Pork Neck)", "午餐肉 (Luncheon Meat)", "火腿 (Ham)", "煙肉 (Bacon)", "香腸 (Sausage)",
    "三文魚 (Salmon)", "吞拿魚 (Tuna)", "鱈魚 (Cod)", "鱸魚 (Sea Bass)", "石斑 (Garoupa)",
    "蝦 (Shrimp)", "蟹 (Crab)", "龍蝦 (Lobster)", "扇貝 (Scallop)", "青口 (Mussel)",
    "墨魚 (Cuttlefish)", "魷魚 (Squid)", "章魚 (Octopus)", "豆腐 (Tofu)", "豆乾 (Dried Tofu)"
  ];

  const FRUIT_NAMES = [
    "柑 (Mandarin)", "柚子 (Pomelo)", "西柚 (Grapefruit)", "檸檬 (Lemon)", "青檸 (Lime)",
    "提子 (Grape)", "青提 (Green Grape)", "紅提 (Red Grape)", "黑提 (Black Grape)", "士多啤梨 (Strawberry)",
    "藍莓 (Blueberry)", "車厘子 (Cherry)", "西瓜 (Watermelon)", "哈密瓜 (Cantaloupe)", "蜜瓜 (Honeydew)",
    "木瓜 (Papaya)", "芒果 (Mango)", "菠蘿 (Pineapple)", "椰子 (Coconut)", "牛油果 (Avocado)",
    "奇異果 (Kiwi)", "金奇異果 (Gold Kiwi)", "火龍果 (Dragon Fruit)", "百香果 (Passion Fruit)", "石榴 (Pomegranate)",
    "番石榴 (Guava)", "楊桃 (Star Fruit)", "柿子 (Persimmon)", "桃 (Peach)", "水蜜桃 (Juicy Peach)",
    "李子 (Plum)", "梨 (Pear)", "雪梨 (Snow Pear)", "荔枝 (Lychee)", "龍眼 (Longan)",
    "山竹 (Mangosteen)", "榴槤 (Durian)", "無花果 (Fig)", "提子乾 (Raisin)", "杏脯 (Dried Apricot)",
    "蔓越莓乾 (Dried Cranberry)", "藍莓乾 (Dried Blueberry)", "椰棗 (Date Palm)", "紅棗 (Red Date)", "杞子 (Goji Berry)"
  ];

  const VEGGIE_NAMES = [
    "菜心 (Choi Sum)", "芥蘭 (Gai Lan)", "白菜 (Bok Choy)", "小棠菜 (Shanghai Bok Choy)", "娃娃菜 (Baby Cabbage)",
    "紹菜 (Napa Cabbage)", "椰菜 (Cabbage)", "生菜 (Lettuce)", "西生菜 (Iceberg Lettuce)", "菠菜 (Spinach)",
    "通菜 (Water Spinach)", "番薯葉 (Sweet Potato Leaves)", "莧菜 (Amaranth)", "西洋菜 (Watercress)", "豆苗 (Pea Shoots)",
    "西蘭花 (Broccoli)", "椰菜花 (Cauliflower)", "西芹 (Celery)", "芫荽 (Coriander)", "蔥 (Scallion)",
    "洋蔥 (Onion)", "紫洋蔥 (Red Onion)", "蒜頭 (Garlic)", "薑 (Ginger)", "紅蘿蔔 (Carrot)",
    "白蘿蔔 (Radish)", "蓮藕 (Lotus Root)", "馬蹄 (Water Chestnut)", "粟米 (Corn)", "粟米仔 (Baby Corn)",
    "番茄 (Tomato)", "車厘茄 (Cherry Tomato)", "茄子 (Eggplant)", "青瓜 (Cucumber)", "節瓜 (Hairy Gourd)",
    "冬瓜 (Winter Melon)", "南瓜 (Pumpkin)", "翠玉瓜 (Zucchini)", "苦瓜 (Bitter Melon)", "絲瓜 (Luffa)",
    "四季豆 (Green Bean)", "荷蘭豆 (Snow Pea)", "蜜糖豆 (Snap Pea)", "芽菜 (Bean Sprout)", "蘑菇 (Mushroom)",
    "冬菇 (Shiitake)", "金菇 (Enoki)", "雲耳 (Black Fungus)", "秋葵 (Okra)", "燈籠椒 (Bell Pepper)"
  ];

  const generate = (names: string[], prefix: string, minPrice: number, maxPrice: number) => {
    return names.map((name, i) => {
      const isEgg = name.includes('蛋') || name.toLowerCase().includes('egg');
      const isBread = name.includes('包') || name.toLowerCase().includes('bread') || name.toLowerCase().includes('bun');
      const isFruit = prefix === 'f';
      
      let unit = 'g';
      let defaultPortion = 100;
      
      if (isEgg) {
        unit = lang === 'zh' ? '顆' : 'pc';
        defaultPortion = 1;
      } else if (isBread && !name.includes('方包') && !name.includes('法包')) {
        unit = lang === 'zh' ? '個' : 'pc';
        defaultPortion = 1;
      } else if (isFruit && (name.includes('柑') || name.includes('檸檬') || name.includes('奇異果') || name.includes('蘋果') || name.includes('梨'))) {
        unit = lang === 'zh' ? '個' : 'pc';
        defaultPortion = 1;
      }

      return {
        id: `${prefix}${i + 1}`,
        name: name,
        price: Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice,
        emoji: "",
        unit,
        portion: defaultPortion,
        basePortion: defaultPortion
      };
    });
  };

  return {
    grains: generate(GRAIN_NAMES, 'g', 3, 12),
    meat: generate(MEAT_NAMES, 'm', 12, 32),
    fruits: generate(FRUIT_NAMES, 'f', 2, 10),
    veggies: generate(VEGGIE_NAMES, 'v', 4, 14)
  };
};

export default function App() {
 const [lang, setLang] = useState<'zh' | 'en'>('zh');
 const NUVISION_ITEMS = useMemo(() => generateNuVisionItems(lang), [lang]);
 const t = translations[lang];
 
 const [currentPage, setCurrentPage] = useState('setup');
 const [isProfileExpanded, setIsProfileExpanded] = useState(true); // Default open
 const [isActivityExpanded, setIsActivityExpanded] = useState(true); // New state for foldable activity section
 
 const [profiles, setProfiles] = useState<UserProfile[]>(() => {
   const saved = localStorage.getItem('nubalance_profiles');
   const initial = saved ? JSON.parse(saved) : [{
     id: 'user-1',
     name: '我 (My Profile)',
     height: '172',
     weight: '68',
     targetWeight: '65',
     age: '30',
     gender: 'male',
     activity: 'sedentary',
     logs: [],
     waterIntake: 0,
     avatarColor: 'bg-indigo-500',
     weightHistory: [
       { id: 'w1', weight: 70, date: new Date(Date.now() - 86400000 * 7).toISOString() },
       { id: 'w2', weight: 69, date: new Date(Date.now() - 86400000 * 3).toISOString() },
       { id: 'w3', weight: 68, date: new Date().toISOString() },
     ]
   }];
   return initial.map((p: any) => ({ 
     ...p, 
     logs: p.logs || [], 
     weightHistory: p.weightHistory || [],
     targetWeight: p.targetWeight || p.weight
   }));
 });
 const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    return localStorage.getItem('nubalance_active_id') || 'user-1';
 });
 const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
 const [showHistoryModal, setShowHistoryModal] = useState(false);
 const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);

 useEffect(() => { localStorage.setItem('nubalance_profiles', JSON.stringify(profiles)); }, [profiles]);
 useEffect(() => { localStorage.setItem('nubalance_active_id', activeProfileId); }, [activeProfileId]);
 useEffect(() => { setIsDeleteConfirming(false); }, [activeProfileId]);

 const currentProfile = useMemo(() => profiles.find(p => p.id === activeProfileId) || profiles[0], [profiles, activeProfileId]);

 const dailyConsumed = useMemo(() => {
   const logs = currentProfile.logs;
   const exercises = currentProfile.exercises || [];
   const totals = logs.reduce((acc, log) => ({
     calories: acc.calories + log.calories,
     protein: acc.protein + log.protein,
     carbs: acc.carbs + log.carbs,
     fat: acc.fat + log.fat
   }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

   const burned = exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
   return { ...totals, calories: totals.calories - burned, rawCalories: totals.calories, burned };
 }, [currentProfile.logs, currentProfile.exercises]);

 const updateCurrentProfile = (field: keyof UserProfile, value: any) => {
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, [field]: value } : p));
 };

 const addLogEntry = (entry: Omit<LogEntry, 'id' | 'time'>) => {
   const newLog: LogEntry = { ...entry, id: `log-${Date.now()}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, logs: [newLog, ...p.logs] } : p));
 };

 const removeLogEntry = (logId: string) => {
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, logs: p.logs.filter(l => l.id !== logId) } : p));
 };

 const updateCurrentProfileWater = (newWater: number) => {
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, waterIntake: newWater } : p));
 };

 const createNewProfile = () => {
   const newId = `user-${Date.now()}`;
   const colors = ['bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-cyan-500', 'bg-violet-500'];
   const newProfile: UserProfile = {
     id: newId, 
     name: lang === 'zh' ? '新成員' : 'New Member', 
     height: '160', 
     weight: '60', 
     targetWeight: '55',
     age: '60', 
     gender: 'female', 
     activity: 'sedentary', 
     logs: [], 
     waterIntake: 0, 
     avatarColor: colors[profiles.length % colors.length],
     weightHistory: [{ id: `w-${Date.now()}`, weight: 60, date: new Date().toISOString() }]
   };
   setProfiles([...profiles, newProfile]);
   setActiveProfileId(newId);
   setIsProfileExpanded(true); // Ensure new profile is expanded
 };

 const deleteProfile = (id: string) => {
   if (profiles.length <= 1) return;
   const newProfiles = profiles.filter(p => p.id !== id);
   setProfiles(newProfiles);
   if (activeProfileId === id) { setActiveProfileId(newProfiles[0].id); }
   setIsDeleteConfirming(false);
 };

 const addWeightEntry = (weight: number) => {
   if (isNaN(weight) || weight <= 0) return;
   const newEntry: WeightEntry = {
     id: `w-${Date.now()}`,
     weight,
     date: new Date().toISOString()
   };
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { 
     ...p, 
     weight: weight.toString(),
     weightHistory: [...p.weightHistory, newEntry] 
   } : p));
   setNewWeightInput('');
 };

 const updateTargetWeight = (weight: string) => {
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, targetWeight: weight } : p));
 };

 const [isAiSearching, setIsAiSearching] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [refinementDetails, setRefinementDetails] = useState('');
 const [refinementPrompt, setRefinementPrompt] = useState<string | null>(null);
 const [showWaterMenu, setShowWaterMenu] = useState(false);
 const [customWaterVal, setCustomWaterVal] = useState('');
 
 const [showChatOverlay, setShowChatOverlay] = useState(false);
 const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
 const [chatInput, setChatInput] = useState('');
 const [isChatLoading, setIsChatLoading] = useState(false);
 const chatEndRef = useRef<HTMLDivElement>(null);

 const [showAiModal, setShowAiModal] = useState(false);
 const [showProgressModal, setShowProgressModal] = useState(false);
 const [newWeightInput, setNewWeightInput] = useState('');
 const [targetWeightInput, setTargetWeightInput] = useState('');
 const [showSearchOverlay, setShowSearchOverlay] = useState(false); 
 const [activeCategory, setActiveCategory] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
 const [aiBatchIndices, setAiBatchIndices] = useState<Record<string, number>>({ breakfast: 0, lunch: 0, dinner: 0 });
 const [selectedDish, setSelectedDish] = useState<Recipe | null>(null);
 const [selectedProportion, setSelectedProportion] = useState(1);

 const [browsingCategory, setBrowsingCategory] = useState<any | null>(null);
 const [dbSearchQuery, setDbSearchQuery] = useState('');
 const [selectedSubgroup, setSelectedSubgroup] = useState<string | null>(null);

 const [aiSearchResult, setAiSearchResult] = useState<AiSearchResult | null>(null);
 const [selectedPortion, setSelectedPortion] = useState<AiPortion | null>(null);
 const [customGramAmount, setCustomGramAmount] = useState<string>('100');
 
 const [showActionMenu, setShowActionMenu] = useState(false);
 const [showShapeStretch, setShowShapeStretch] = useState(false);
 const [selectedShapeCategory, setSelectedShapeCategory] = useState<string | null>(null);
 const [shapeStretchTab, setShapeStretchTab] = useState<'all' | 'stretch' | 'exercise'>('all');

 // --- NuVision State ---
 const [showNuVisionModal, setShowNuVisionModal] = useState(false);
 const [showPersonalModal, setShowPersonalModal] = useState(false);
 const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
 const [nuVisionImage, setNuVisionImage] = useState<string | null>(null);
 const [isNuVisionAnalyzing, setIsNuVisionAnalyzing] = useState(false);
 const [nuVisionResult, setNuVisionResult] = useState<any | null>(null);
 const [nuVisionCart, setNuVisionCart] = useState<string[]>([]);
 const [isNuVisionBasketOpen, setIsNuVisionBasketOpen] = useState(false);
 const [nuVisionCategory, setNuVisionCategory] = useState('all');
 const [nuVisionBudget, setNuVisionBudget] = useState(50);
 const [nuVisionMaxItems, setNuVisionMaxItems] = useState(4);
 const [isEditingNuVisionBudget, setIsEditingNuVisionBudget] = useState(false);
 const [isEditingNuVisionPrice, setIsEditingNuVisionPrice] = useState(false);

  // --- NuVision Scanner State ---
  const [showHealthReport, setShowHealthReport] = useState(false);
  const [showHealthHistory, setShowHealthHistory] = useState(false);
  const [showInteractiveModal, setShowInteractiveModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [nuVisionSearchQuery, setNuVisionSearchQuery] = useState('');
  const [isNuVisionSearching, setIsNuVisionSearching] = useState(false);
  const [isNuVisionPhotoSearching, setIsNuVisionPhotoSearching] = useState(false);
  const [nuVisionSearchItem, setNuVisionSearchItem] = useState<any | null>(null);
  const [nuVisionCustomItems, setNuVisionCustomItems] = useState<any[]>([]);
  const nuVisionPhotoSearchFileRef = useRef<HTMLInputElement>(null);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
  const [isExerciseSearching, setIsExerciseSearching] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<any[]>([]);
  const [healthReportContent, setHealthReportContent] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  const scaleIngredients = (ingredients: string, factor: number) => {
    if (factor === 1) return ingredients;
    // Match numbers followed by units like g, ml, 份, 隻, pc, portion
    return ingredients.replace(/(\d+(\.\d+)?)\s*(g|ml|份|隻|pc|portion|碗|杯|個|塊|條)/g, (match, num, _, unit) => {
      const scaled = parseFloat((parseFloat(num) * factor).toFixed(1));
      return `${scaled}${unit}`;
    });
  };

  // --- NuVision Handlers ---
  const handleScannerAnalyze = async (image: string) => {
    setIsScannerAnalyzing(true);
    setScannerResult(null);
    setSelectedPortion(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const langPrompt = lang === 'zh' ? "Respond in Traditional Chinese. Ensure all names, descriptions, and suggestions are in Traditional Chinese." : "Respond in English. Ensure all names, descriptions, and suggestions are in English.";
      const foodNameContext = scannerFoodName ? `The user identified this food as: "${scannerFoodName}". ` : "";
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [
          {
            parts: [
              { text: `${foodNameContext}Analyze this food or food label image. ${langPrompt} Provide: 1. Name of the food. 2. Estimated calories (per 100g). 3. Macro proportions (protein, carbs, fat in grams per 100g). 4. Hidden nutrition/traps (e.g., high sodium, additives, hidden sugars, trans fats). 5. Creative AI suggestion for a healthier alternative or how to balance this meal. 6. A 'Nutrition Score' from 0-100. 7. Portion analysis: Estimate the portion size visible in the image (e.g., "Detected Portion") and provide at least 3 other common portion sizes (e.g., Small, Medium, Large) and their weights in grams. Return ONLY a JSON object with keys: name, calories, protein, carbs, fat, saturatedFat, transFat, sodium, sugar, hiddenTraps (array of strings), aiSuggestion, nutritionScore, portions (array of {label, weight, calories, protein, carbs, fat, saturatedFat, transFat, sodium, sugar, isCustomBase}). Ensure one portion is "100g" with isCustomBase: true, and one portion is the "Detected Portion" (AI 識別份量) based on the image.` },
              { inlineData: { mimeType: "image/jpeg", data: image.split(',')[1] } }
            ]
          }
        ],
        config: { responseMimeType: "application/json" }
      });
      const jsonString = response.text ? response.text.replace(/```json|```/g, '').trim() : "{}";
      const result = JSON.parse(jsonString);
      setScannerResult(result);
      if (result.portions && result.portions.length > 0) {
        setSelectedPortion(result.portions[0]);
      }
    } catch (error) {
      console.error(error);
      alert(t.analysisFailed);
    } finally {
      setIsScannerAnalyzing(false);
    }
  };

  const downloadHealthReportPDF = async () => {
    const element = document.getElementById('health-report-a4-template');
    if (!element) return;
    
    // Temporarily show the template off-screen for capture
    element.style.display = 'block';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794, // A4 width at 96dpi
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`NuBalance_Health_Report_${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      // Hide the template again if needed, but it's already off-screen
    }
  };

  const handleGenerateHealthReport = async () => {
    setIsGeneratingReport(true);
    setShowHealthReport(true);
    setHealthReportContent('');
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const langPrompt = lang === 'zh' ? "Respond in Traditional Chinese." : "Respond in English.";
      const dataSummary = `
        User: ${currentProfile.name}, Age: ${currentProfile.age}, Gender: ${currentProfile.gender}
        Current Weight: ${currentProfile.weight}kg, Target Weight: ${currentProfile.targetWeight}kg
        Recent Logs: ${JSON.stringify(currentProfile.logs.slice(0, 10))}
        Weight History: ${JSON.stringify(currentProfile.weightHistory.slice(0, 5))}
      `;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [
          {
            parts: [
              { text: `Generate a comprehensive, well-organized weekly health report based on this data. ${langPrompt} 
              The report should be visually appealing when rendered in Markdown. 
              Use clear sections:
              # 📊 Weekly Health Insights
              ## 👤 Profile Overview
              ## 📈 Progress Summary
              ## 🍎 Nutritional Analysis (Analyze protein, carbs, fat balance)
              ## ⚖️ Weight Trend & BMI Insights
              ## 💡 Personalized Action Plan for Next Week
              ## 📚 Academic References & Sources (Quote real academic sources or health guidelines from WHO, Harvard Health, etc. with links)
              ## 🌟 Motivational Quote
              
              Use tables where appropriate for data. Use a supportive and professional tone. Return as Markdown.` },
              { text: dataSummary }
            ]
          }
        ]
      });
      const content = response.text;
      setHealthReportContent(content);

      // Save to history
      const newReport: HealthReport = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        content: content,
        title: lang === 'zh' ? `健康週報 - ${new Date().toLocaleDateString('zh-TW')}` : `Health Report - ${new Date().toLocaleDateString()}`
      };
      
      setProfiles(prev => prev.map(p => 
        p.id === currentProfile.id 
          ? { ...p, healthReports: [newReport, ...(p.healthReports || [])] }
          : p
      ));
    } catch (error) {
      console.error(error);
      setHealthReportContent("Failed to generate report. Please try again later.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleNuVisionSearch = async () => {
    if (!nuVisionSearchQuery.trim()) return;
    setIsNuVisionSearching(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const langPrompt = lang === 'zh' ? "Respond in Traditional Chinese." : "Respond in English.";
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [
          {
            parts: [
              { text: `Search for the food item: "${nuVisionSearchQuery}". ${langPrompt} 
              1. Estimate the current price in Hong Kong supermarkets (HKD). 
              2. Provide nutritional info per 100g (calories, protein, carbs, fat).
              3. Suggest a category (vegetables, fruits, meat, seafood, dairy, snacks).
              Return ONLY a JSON object: { name, price, calories, protein, carbs, fat, category, emoji }.` }
            ]
          }
        ],
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json" 
        }
      });
      const jsonString = response.text ? response.text.replace(/```json|```/g, '').trim() : "{}";
      const result = JSON.parse(jsonString);
      const newItem = {
        id: `search-${Date.now()}`,
        ...result,
        portion: "100g",
        quantity: 1
      };
      setNuVisionSearchItem(newItem);
    } catch (error) {
      console.error(error);
    } finally {
      setIsNuVisionSearching(false);
    }
  };

  const handleNuVisionPhotoSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsNuVisionPhotoSearching(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          alert("GEMINI_API_KEY is missing. Please set it in your environment variables.");
          setIsNuVisionPhotoSearching(false);
          return;
        }
        const ai = new GoogleGenAI({ apiKey });
        const langPrompt = lang === 'zh' ? "Respond in Traditional Chinese." : "Respond in English.";
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-preview",
          contents: [
            {
              parts: [
                { inlineData: { data: base64Data, mimeType: file.type } },
                { text: `Analyze this food image for the "Market Shopping Challenge". ${langPrompt} 
                1. Identify the food item.
                2. Estimate the portion/quantity shown in the image (e.g., "1 piece", "250g").
                3. Estimate the price in HKD for that portion in a Hong Kong market.
                4. Provide nutritional info for that portion (calories, protein, carbs, fat).
                5. Suggest a category (vegetables, fruits, meat, seafood, dairy, snacks).
                Return ONLY a JSON object: { name, portion, price, calories, protein, carbs, fat, category, emoji }.` }
              ]
            }
          ],
          config: { 
            responseMimeType: "application/json" 
          }
        });
        const jsonString = response.text ? response.text.replace(/```json|```/g, '').trim() : "{}";
        const result = JSON.parse(jsonString);
        const newItem = {
          id: `search-${Date.now()}`,
          ...result,
          isPhotoSearch: true,
          quantity: 1
        };
        setNuVisionSearchItem(newItem);
        setNuVisionSearchQuery(result.name);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      alert(t.analysisFailed);
    } finally {
      setIsNuVisionPhotoSearching(false);
      if (nuVisionPhotoSearchFileRef.current) nuVisionPhotoSearchFileRef.current.value = '';
    }
  };

  const handleExerciseSearch = async () => {
    if (!exerciseSearchQuery.trim()) return;
    setIsExerciseSearching(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const langPrompt = lang === 'zh' ? "Respond in Traditional Chinese." : "Respond in English.";
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [
          {
            parts: [
              { text: `Search for exercise: "${exerciseSearchQuery}". ${langPrompt} 
              Estimate calories burned per 30 minutes for a person weighing ${currentProfile.weight}kg.
              Return ONLY a JSON array of objects: [{ name, caloriesBurnedPer30Min, emoji }].` }
            ]
          }
        ],
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json" 
        }
      });
      const jsonString = response.text ? response.text.replace(/```json|```/g, '').trim() : "{}";
      setExerciseResults(JSON.parse(jsonString));
    } catch (error) {
      console.error(error);
    } finally {
      setIsExerciseSearching(false);
    }
  };

  const addExerciseLog = (exercise: any, duration: number) => {
    const caloriesBurned = Math.round((exercise.caloriesBurnedPer30Min / 30) * duration);
    const newLog: ExerciseLog = {
      id: `ex-${Date.now()}`,
      name: exercise.name,
      caloriesBurned,
      duration,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, exercises: [...(p.exercises || []), newLog] } : p));
    setShowExerciseModal(false);
    setExerciseSearchQuery('');
    setExerciseResults([]);
  };

  const handleExportData = () => {
    const logsHeader = "Date,Time,Name,Calories,Protein,Carbs,Fat\n";
    const logsData = currentProfile.logs.map(log => {
      return `${new Date().toLocaleDateString()},${log.time},"${log.name}",${log.calories},${log.protein},${log.carbs},${log.fat}`;
    }).join("\n");
    
    const weightHeader = "\n\nWeight History\nDate,Weight\n";
    const weightData = currentProfile.weightHistory.map(w => {
      return `${new Date(w.date).toLocaleDateString()},${w.weight}`;
    }).join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + logsHeader + logsData + weightHeader + weightData;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NuBalance_Data_${currentProfile.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const achievements = useMemo(() => {
    const list = [];
    if (currentProfile.logs.length >= 1) list.push({ id: 'first_log', icon: '🎯', title: lang === 'zh' ? '初試啼聲' : 'First Step', desc: lang === 'zh' ? '記錄第一餐' : 'Logged first meal' });
    if (currentProfile.logs.length >= 10) list.push({ id: 'ten_logs', icon: '🔥', title: lang === 'zh' ? '堅持不懈' : 'Consistent', desc: lang === 'zh' ? '記錄超過 10 餐' : 'Logged 10+ meals' });
    if (currentProfile.waterIntake >= 2000) list.push({ id: 'water_goal', icon: '💧', title: lang === 'zh' ? '水潤達人' : 'Hydration Pro', desc: lang === 'zh' ? '單日飲水達 2000ml' : '2000ml water in a day' });
    if (currentProfile.weightHistory.length >= 2) {
      const first = currentProfile.weightHistory[0].weight;
      const last = currentProfile.weightHistory[currentProfile.weightHistory.length - 1].weight;
      if (last < first) list.push({ id: 'weight_loss', icon: '📉', title: lang === 'zh' ? '輕盈啟航' : 'Weight Dropped', desc: lang === 'zh' ? '體重有所下降' : 'Weight has decreased' });
    }
    return list;
  }, [currentProfile, lang]);

  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scannerImage, setScannerImage] = useState<string | null>(null);
  const [isScannerAnalyzing, setIsScannerAnalyzing] = useState(false);
  const [scannerResult, setScannerResult] = useState<any | null>(null);
  const [scannerFoodName, setScannerFoodName] = useState('');
  const [scannerProportion, setScannerProportion] = useState(1);
  const scannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const addScannerResultToDaily = () => {
    if (!scannerResult || !currentAiNutrition) return;
    const newLog: LogEntry = {
      id: `scan-${Date.now()}`,
      name: scannerFoodName || scannerResult.name,
      emoji: "🥗",
      calories: currentAiNutrition.calories,
      protein: currentAiNutrition.protein,
      carbs: currentAiNutrition.carbs,
      fat: currentAiNutrition.fat,
      saturatedFat: currentAiNutrition.saturatedFat,
      transFat: currentAiNutrition.transFat,
      sodium: currentAiNutrition.sodium,
      sugar: currentAiNutrition.sugar,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, logs: [...p.logs, newLog] } : p));
    setShowScannerModal(false);
    setScannerResult(null);
    setScannerImage(null);
    setSelectedPortion(null);
    setScannerFoodName('');
    setScannerProportion(1);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newProfiles = profiles.map(p => 
          p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, imageUrl: base64String } } : p
        );
        setProfiles(newProfiles);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatarImage = () => {
    const newProfiles = profiles.map(p => 
      p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, imageUrl: undefined } } : p
    );
    setProfiles(newProfiles);
  };

  const getLocalizedValue = (val: string) => {
    if (!val) return "";
    if (lang === 'en') {
      const match = val.match(/\(([^)]+)\)/);
      return match ? match[1] : val;
    } else {
      return val.split(' (')[0];
    }
  };

  const toggleNuVisionItem = (itemId: string, customItem?: any) => {
    setNuVisionCart(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        if (prev.length >= nuVisionMaxItems) {
          alert(t.maxItems.replace('{0}', nuVisionMaxItems.toString()));
          return prev;
        }
        
        const baseItem = nuVisionCustomItems.find(i => i.id === itemId) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === itemId);
        const newItem = customItem || { ...baseItem, quantity: 1, portion: baseItem?.portion || 100 };
        
        if (newItem && newItem.quantity === undefined) newItem.quantity = 1;
        if (newItem && newItem.portion === undefined) newItem.portion = baseItem?.portion || 100;

        // Check budget
        const currentTotal = prev.reduce((sum, id) => {
          const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
          const itemPrice = (item?.price || 0) * (item?.quantity || 1) * ((item?.portion || 100) / (item?.basePortion || 100));
          return sum + itemPrice;
        }, 0);
        
        const newItemPrice = (newItem?.price || 0) * (newItem?.quantity || 1) * ((newItem?.portion || 100) / (newItem?.basePortion || 100));

        if (currentTotal + newItemPrice > nuVisionBudget) {
          alert(t.overBudget);
          return prev;
        }
        
        // Always add to custom items to track quantity
        if (!nuVisionCustomItems.find(i => i.id === itemId)) {
          setNuVisionCustomItems(prevCustom => [...prevCustom, newItem]);
        } else if (customItem) {
          // Update if it's a specific custom item being added
          setNuVisionCustomItems(prevCustom => prevCustom.map(i => i.id === itemId ? newItem : i));
        }
        
        return [...prev, itemId];
      }
    });
  };
 
  const handleNuVisionAnalyze = async () => {
    if (nuVisionCart.length === 0) return;
    setIsNuVisionAnalyzing(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const selectedItems = nuVisionCart.map(id => {
        const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
        if (!item) return '';
        const currentPrice = Math.round((item.price || 0) * (item.quantity || 1) * ((item.portion || 100) / (item.basePortion || 100)));
        return `${getLocalizedValue(item.name)} (${item.portion}${item.unit}, $${currentPrice}, x${item.quantity || 1})`;
      }).join(', ');

      const contents = [{ text: `Analyze meal basket (Budget $${nuVisionBudget}): ${selectedItems}. Output JSON.` }];
 
      const systemPrompt = `
         Role: AI Nutrition Judge for "Market Shopping Challenge" (街市採購挑戰).
         Goal: Teach users "Budget-friendly, High-quality, Balanced" meals.
         
         Output JSON Format:
         {
           "score": number (0-100),
           "summary": "Short evaluation in ${lang === 'zh' ? 'Traditional Chinese (Cantonese style)' : 'English'}",
           "macros": { "protein": "x%", "carbs": "x%", "fat": "x%" },
           "micros": {
             "saturatedFat": "High/Med/Low (Value)",
             "transFat": "High/Med/Low (Value)",
             "sodium": "High/Med/Low (Value)",
             "sugar": "High/Med/Low (Value)"
           },
           "hiddenNutrients": [
             { "food": "Food Name", "benefit": "Rich in X, helps with Y" }
           ],
           "advice": "Suggestion to improve nutrient absorption or budget balance (e.g., add Vit C)"
         }
         Language: ${lang === 'zh' ? 'Traditional Chinese (Cantonese style)' : 'English'}.
         SPEED: Be extremely concise.
      `;
 
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: contents,
        config: { 
          responseMimeType: 'application/json',
          systemInstruction: systemPrompt,
          thinkingConfig: { thinkingLevel: 'LOW' as any }
        }
      });
      
      const jsonString = response.text ? response.text.replace(/```json|```/g, '').trim() : "{}";
      setNuVisionResult(JSON.parse(jsonString));
    } catch (e) {
      console.error(e);
      alert(t.analysisFailed);
    } finally {
      setIsNuVisionAnalyzing(false);
    }
  };

 const activityOptions = [
 { id: 'sedentary', label: lang === 'zh' ? '久坐（幾乎不運動）' : 'Sedentary', factor: 1.2 },
 { id: 'light', label: lang === 'zh' ? '輕度（每週運動 1-3 天）' : 'Lightly Active', factor: 1.375 },
 { id: 'moderate', label: lang === 'zh' ? '中度（每週運動 3-5 天）' : 'Moderately Active', factor: 1.55 },
 { id: 'heavy', label: lang === 'zh' ? '高度（每週運動 6-7 天）' : 'Very Active', factor: 1.725 },
 ];

  const nutritionTargets = useMemo(() => {
    const h = parseFloat(currentProfile.height) || 0;
    const w = parseFloat(currentProfile.weight) || 0;
    const a = parseFloat(currentProfile.age) || 0;
    if (!h || !w || !a) return { calories: 2000, protein: 100, carbs: 250, fat: 60, bmi: '0.0', waterGoal: 2000 };
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = currentProfile.gender === 'male' ? bmr + 5 : bmr - 161;
    const factor = activityOptions.find(o => o.id === currentProfile.activity)?.factor || 1.2;
    const tdee = bmr * factor;
    return {
      calories: Math.round(tdee),
      protein: (tdee * 0.25) / 4,
      carbs: (tdee * 0.45) / 4,
      fat: (tdee * 0.30) / 9,
      bmi: (w / ((h / 100) ** 2)).toFixed(1),
      waterGoal: 2000
    };
  }, [currentProfile, lang]);

 useEffect(() => { if (showChatOverlay) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, showChatOverlay]);

 const handleInputChange = (field: keyof UserProfile, value: string) => { updateCurrentProfile(field, value); };

 const addWater = (amount: string | number) => {
   const vol = typeof amount === 'string' ? parseInt(amount) : amount;
   if (!isNaN(vol) && vol > 0) {
     updateCurrentProfileWater(currentProfile.waterIntake + vol);
     setCustomWaterVal('');
     setShowWaterMenu(false);
   }
 };

 const handleSelectDish = async (dish: any) => {
    if (dish.ingredients && dish.method) {
      setSelectedDish(dish);
      setShowAiModal(true);
      return;
    }

    setIsAiSearching(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const prompt = lang === 'zh'
        ? `為食譜「${getLocalizedValue(dish.name)}」提供詳細資訊。格式：{ingredients: "食材列表", method: ["步驟1", "步驟2", ...]}。請保持簡潔。`
        : `Provide details for the recipe "${getLocalizedValue(dish.name)}". Format: {ingredients: "list of ingredients", method: ["step 1", "step 2", ...]}. Keep it concise.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const jsonString = response.text ? response.text.replace(/```json|```/g, '').trim() : "{}";
      const details = JSON.parse(jsonString);
      
      const fullDish = { ...dish, ...details };
      setSelectedDish(fullDish);
      setShowAiModal(true);
    } catch (error) {
      console.error("Fetch Recipe Details Error:", error);
      setSelectedDish({ ...dish, ingredients: "無法獲取食材", method: ["無法獲取步驟"] });
      setShowAiModal(true);
    } finally {
      setIsAiSearching(false);
    }
  };

 const handleAddDish = (dish: Recipe) => {
  addLogEntry({ 
    name: dish.name, 
    emoji: dish.emoji, 
    calories: Math.round(dish.calories * selectedProportion), 
    protein: parseFloat((dish.protein * selectedProportion).toFixed(1)), 
    carbs: parseFloat((dish.carbs * selectedProportion).toFixed(1)), 
    fat: parseFloat((dish.fat * selectedProportion).toFixed(1)) 
  });
  setSelectedDish(null);
  setSelectedProportion(1);
  setShowAiModal(false);
 };

 const handleAddDbItem = (item: FoodDatabaseItem) => {
   addLogEntry({ name: item.name, emoji: item.emoji, calories: item.calories, protein: item.protein, carbs: item.carbs, fat: item.fat });
   setBrowsingCategory(null);
   setDbSearchQuery('');
   setSelectedSubgroup(null);
 };

 const currentAiNutrition = useMemo(() => {
   if (!selectedPortion) return null;
   
   // Find the 100g base if we need to calculate custom amounts
   const base100g = scannerResult || aiSearchResult?.portions?.find(p => p.isCustomBase);
   
   if (selectedPortion.isCustomBase && base100g) {
     const grams = parseFloat(customGramAmount) || 0;
     const ratio = grams / 100;
     return {
       calories: Math.round(base100g.calories * ratio),
       protein: parseFloat((base100g.protein * ratio).toFixed(1)),
       carbs: parseFloat((base100g.carbs * ratio).toFixed(1)),
       fat: parseFloat((base100g.fat * ratio).toFixed(1)),
       saturatedFat: parseFloat(((base100g.saturatedFat || 0) * ratio).toFixed(1)),
       transFat: parseFloat(((base100g.transFat || 0) * ratio).toFixed(1)),
       sodium: Math.round((base100g.sodium || 0) * ratio),
       sugar: parseFloat(((base100g.sugar || 0) * ratio).toFixed(1))
     };
   }
   
   return {
       ...selectedPortion,
       saturatedFat: selectedPortion.saturatedFat || 0,
       transFat: selectedPortion.transFat || 0,
       sodium: selectedPortion.sodium || 0,
       sugar: selectedPortion.sugar || 0
   };
 }, [selectedPortion, scannerResult, aiSearchResult, customGramAmount, scannerProportion]);

 const handleAddAiResult = () => {
   const nut = currentAiNutrition;
   if (!nut) return;
   addLogEntry({ 
     name: aiSearchResult?.name || "AI Food", 
     emoji: aiSearchResult?.emoji || "🍽️", 
     calories: nut.calories, 
     protein: nut.protein, 
     carbs: nut.carbs, 
     fat: nut.fat,
     saturatedFat: nut.saturatedFat,
     transFat: nut.transFat,
     sodium: nut.sodium,
     sugar: nut.sugar
   });
   setAiSearchResult(null);
   setSelectedPortion(null);
   setSearchQuery('');
   setRefinementDetails('');
   setRefinementPrompt(null);
   setCustomGramAmount('100');
 };

 const handleAiSearch = async () => {
   if (!searchQuery.trim()) return;
   setIsAiSearching(true);
   try {
     const apiKey = process.env.GEMINI_API_KEY;
     if (!apiKey) {
       throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
     }
     const ai = new GoogleGenAI({ apiKey });
     const fullQuery = refinementPrompt ? `${searchQuery} (補充細節: ${refinementDetails})` : searchQuery;
     const response = await ai.models.generateContent({
       model: 'gemini-3-flash-preview',
       contents: lang === 'zh' 
         ? `分析「${fullQuery}」。規則：1.太籠統則 needsMoreInfo: true。2.資訊足夠則回傳數據。3.portions 須含 4-5 個人性化份量及 1 個「每 100g (自訂基準)」(isCustomBase: true)。格式：{needsMoreInfo, promptMessage, name, emoji, brief, portions: [{label, calories, protein, carbs, fat, saturatedFat, transFat, sodium, sugar, isCustomBase}]}`
         : `Analyze "${fullQuery}". Rules: 1. If vague, set needsMoreInfo: true. 2. If sufficient, return data. 3. portions MUST include 4-5 humanized choices and 1 "per 100g (Custom Base)" (isCustomBase: true). Format: {needsMoreInfo, promptMessage, name, emoji, brief, portions: [{label, calories, protein, carbs, fat, saturatedFat, transFat, sodium, sugar, isCustomBase}]}`,
       config: { responseMimeType: 'application/json' }
     });
     const jsonString = response.text ? response.text.replace(/```json|```/g, '').trim() : "{}";
     const data = JSON.parse(jsonString) as AiSearchResult;
     if (data.needsMoreInfo) {
       setRefinementPrompt(data.promptMessage || (lang === 'zh' ? "請提供更多細節。" : "Please provide more details."));
     } else {
       setAiSearchResult(data);
       const defaultPortion = data.portions?.find(p => !p.isCustomBase) || data.portions?.[0] || null;
       setSelectedPortion(defaultPortion);
       setShowSearchOverlay(false);
       setRefinementPrompt(null);
     }
   } catch (error) { 
     console.error("AI Search Error:", error); 
     alert(t.analysisFailed + (error instanceof Error ? ` (${error.message})` : ""));
   } finally { setIsAiSearching(false); }
 };

 const handleSendChatMessage = async () => {
   if (!chatInput.trim() || isChatLoading) return;
   const userMsg: ChatMessage = { role: 'user', text: chatInput };
   
   // Add user message immediately
   setChatMessages(prev => [...prev, userMsg]);
   setChatInput('');
   setIsChatLoading(true);

   // Add placeholder for model response
   setChatMessages(prev => [...prev, { role: 'model', text: '' }]);

   try {
     const apiKey = process.env.GEMINI_API_KEY;
     if (!apiKey) {
       throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
     }
     const ai = new GoogleGenAI({ apiKey });
     
     const userContext = `
       User Profile:
       - Name: ${currentProfile.name}
       - Height: ${currentProfile.height}cm
       - Weight: ${currentProfile.weight}kg
       - Age: ${currentProfile.age}
       - Gender: ${currentProfile.gender}
       - Activity Level: ${currentProfile.activity}
       - Calculated Daily Target: ${nutritionTargets.calories} kcal
       - Protein Target: ${Math.round(nutritionTargets.protein)}g
       - BMI: ${nutritionTargets.bmi} (${parseFloat(nutritionTargets.bmi) < 18.5 ? 'Underweight' : parseFloat(nutritionTargets.bmi) < 24 ? 'Normal' : 'Overweight'})
     `;

     const responseStream = await ai.models.generateContentStream({
       model: 'gemini-3-flash-preview',
       contents: `User Context:\n${userContext}\n\nUser Question:\n${userMsg.text}`,
       config: { 
         systemInstruction: `You are NuBalance Pro's AI Nutrition Mentor.
         
         MANDATORY OUTPUT FORMAT:
         
         [Title]
         [1 sentence summary]

         📊 Nutrition
         - Calories: [Value or N/A]
         - Protein: [Value or N/A]
         - Carbs: [Value or N/A]
         - Fat: [Value or N/A]

         🎯 Advice
         - [Point 1]
         - [Point 2]
         - [Point 3]
         - [Point 4]
         - [Point 5]

         ⚠️ Tip
         - [1 short tip]

         CONSTRAINTS:
         1. NO markdown bold (**).
         2. NO greetings.
         3. Use ${lang === 'zh' ? 'Traditional Chinese' : 'English'}.
         4. Be extremely concise.
         `,
       }
     });

     let fullText = '';
     for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
          setChatMessages(prev => {
            const newHistory = [...prev];
            if (newHistory.length > 0) {
              newHistory[newHistory.length - 1] = { role: 'model', text: fullText };
            }
            return newHistory;
          });
        }
     }
   } catch (error) {
     console.error("Chat Error:", error);
     setChatMessages(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0) {
          newHistory[newHistory.length - 1] = { 
            role: 'model', 
            text: (lang === 'zh' ? "連線失敗，請檢查網絡或稍後再試。" : "Connection failed. Please try again later.") + (error instanceof Error ? ` (${error.message})` : "")
          };
        }
        return newHistory;
     });
   } finally { 
     setIsChatLoading(false); 
   }
 };

 const currentCategoryRecipes = useMemo(() => {
   const filtered = ALL_RECIPES.filter(r => r.category === activeCategory);
   const startIndex = (aiBatchIndices[activeCategory] * 10) % filtered.length;
   return filtered.slice(startIndex, startIndex + 10);
 }, [activeCategory, aiBatchIndices]);

 const refreshBatch = () => {
   setAiBatchIndices(prev => {
     const nextIdx = (prev[activeCategory] + 1) % 10;
     return { ...prev, [activeCategory]: nextIdx };
   });
 };

 const filteredExercises = useMemo(() => {
    if (!selectedShapeCategory) return [];
    const all = SHAPE_STRETCH_CONTENT[selectedShapeCategory] || [];
    if (shapeStretchTab === 'all') return all;
    return all.filter(e => e.type === shapeStretchTab);
 }, [selectedShapeCategory, shapeStretchTab]);

 const filteredDbItems = useMemo(() => {
   if (!browsingCategory) return [];
   let items = FOOD_DATABASE.filter(i => i.category === browsingCategory.name);
   if (selectedSubgroup) { items = items.filter(i => i.subgroup === selectedSubgroup); }
   if (dbSearchQuery.trim()) { items = items.filter(i => i.name.toLowerCase().includes(dbSearchQuery.toLowerCase())); }
   return items;
 }, [browsingCategory, selectedSubgroup, dbSearchQuery]);

 return (
 <div className="fixed inset-0 w-full h-[100dvh] bg-slate-100 flex justify-center items-center font-sans text-slate-900">
  <div className="w-full max-w-md h-full bg-[#F8FAFC] relative flex flex-col shadow-2xl overflow-hidden">
  
  {/* Sticky Header */}
  <div className="bg-white/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100 z-[100] sticky top-0">
    <div className="flex items-center gap-3">
      <AppLogo size="md" />
      <div>
        <h1 className="font-black text-xl text-slate-800 tracking-tight leading-none">NuBalance Pro</h1>
        {currentPage === 'dashboard' && (
          <div className="relative mt-1">
            <button onClick={() => setShowProfileSwitcher(!showProfileSwitcher)} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 pl-1.5 pr-2.5 py-1 rounded-full transition-all">
              <div className={`w-4 h-4 rounded-full ${currentProfile.avatarColor} text-[8px] text-white flex items-center justify-center font-black`}>{currentProfile.name.charAt(0)}</div>
              <span className="text-[10px] font-bold text-slate-600 max-w-[80px] truncate">{currentProfile.name}</span>
              <ChevronDown size={10} className="text-slate-400" />
            </button>
            {/* 快速切換下拉選單 */}
            {showProfileSwitcher && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 z-[60]">
                <div className="text-[10px] font-black text-slate-300 uppercase px-2 py-1 tracking-widest">{t.switchProfile}</div>
                {profiles.map(p => (
                  <button key={p.id} onClick={() => { setActiveProfileId(p.id); setShowProfileSwitcher(false); }} className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left ${activeProfileId === p.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                    <div className={`w-6 h-6 rounded-full ${p.avatarColor} text-[10px] text-white flex items-center justify-center font-black`}>{p.name.charAt(0)}</div>
                    <span className="text-xs font-bold truncate flex-1">{p.name}</span>
                    {activeProfileId === p.id && <Check size={12} />}
                  </button>
                ))}
                <div className="h-px bg-slate-100 my-1"></div>
                <button onClick={() => { setCurrentPage('setup'); setShowProfileSwitcher(false); }} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 text-slate-400 text-xs font-bold">
                  <Plus size={14} /> {t.addProfile}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="bg-slate-100 p-1 rounded-full flex gap-1">
        <button onClick={() => setLang('zh')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'zh' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>繁中</button>
        <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>EN</button>
      </div>
      {currentPage === 'dashboard' && (
        <button onClick={() => setCurrentPage('setup')} className="w-9 h-9 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm active:scale-90 transition-all">
          <User size={18} />
        </button>
      )}
    </div>
  </div>
 
 {/* Scrollable Content Area */}
 <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 scrollbar-hide pb-32">
 
 {currentPage === 'setup' ? (
 <div className="animate-in fade-in duration-500 pb-20">



 {/* 個人資料表單 */}
 <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300">
  <div className={`absolute top-0 left-0 w-full h-1.5 ${currentProfile.avatarColor}`}></div>
  <div className="flex justify-between items-center mb-6 cursor-pointer group" onClick={() => setIsProfileExpanded(!isProfileExpanded)}>
    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
      <div className={`w-3 h-3 rounded-full ${currentProfile.avatarColor}`}></div>
      {t.editProfile}
      <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isProfileExpanded ? 'rotate-180' : ''}`} />
    </h3>
    {profiles.length > 1 && (
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {isDeleteConfirming ? (
          <>
            <button onClick={() => setIsDeleteConfirming(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600 px-3 py-1 bg-slate-100 rounded-lg transition-all">{t.cancel}</button>
            <button onClick={() => deleteProfile(currentProfile.id)} className="text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-3 py-1 rounded-lg shadow-sm transition-all animate-in fade-in zoom-in duration-200">{t.confirmDelete}</button>
          </>
        ) : (
          <button onClick={() => setIsDeleteConfirming(true)} className="text-xs font-bold text-rose-400 hover:text-rose-600 px-3 py-1 bg-rose-50 rounded-lg transition-all">{t.deleteProfile}</button>
        )}
      </div>
    )}
  </div>

  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isProfileExpanded ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
    <div className="mb-6">
      <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.nameLabel}</label>
      <input type="text" value={currentProfile.name} onChange={e => handleInputChange('name', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-lg font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" />
    </div>

    <div className="grid grid-cols-2 gap-6 mb-8">
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.height}</label><input type="text" inputMode="numeric" value={currentProfile.height} onFocus={(e) => e.target.select()} onChange={e => handleInputChange('height', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.weight}</label><input type="text" inputMode="numeric" value={currentProfile.weight} onFocus={(e) => e.target.select()} onChange={e => handleInputChange('weight', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.age}</label><input type="text" inputMode="numeric" value={currentProfile.age} onFocus={(e) => e.target.select()} onChange={e => handleInputChange('age', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.gender}</label><div className="flex bg-slate-50 rounded-2xl p-1 h-[60px]"><button onClick={() => handleInputChange('gender', 'male')} className={`flex-1 rounded-xl text-sm font-bold transition-all ${currentProfile.gender === 'male' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>{t.male}</button><button onClick={() => handleInputChange('gender', 'female')} className={`flex-1 rounded-xl text-sm font-bold transition-all ${currentProfile.gender === 'female' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>{t.female}</button></div></div>
    </div>
    
    {/* Collapsible Activity Section */}
    <div className="mb-10 transition-all duration-300">
      <div 
        onClick={() => setIsActivityExpanded(!isActivityExpanded)}
        className="flex justify-between items-center mb-4 ml-1 cursor-pointer group select-none"
      >
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-500 transition-colors cursor-pointer">
          {t.activity}
        </label>
        <div className="flex items-center gap-2">
           {!isActivityExpanded && (
             <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg animate-in fade-in">
               {activityOptions.find(o => o.id === currentProfile.activity)?.label}
             </span>
           )}
           <ChevronDown 
             size={18} 
             className={`text-slate-300 transition-transform duration-300 ${isActivityExpanded ? 'rotate-180' : ''} group-hover:text-indigo-500`} 
           />
        </div>
      </div>
      
      <div className={`space-y-3 overflow-hidden transition-all duration-500 ease-in-out ${isActivityExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {activityOptions.map(option => (
          <button 
            key={option.id} 
            onClick={() => handleInputChange('activity', option.id)} 
            className={`w-full flex justify-between items-center py-4 px-6 rounded-2xl text-sm font-bold transition-all border-2 ${currentProfile.activity === option.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}
          >
            {option.label}
            {currentProfile.activity === option.id && <Check size={18} />}
          </button>
        ))}
      </div>
    </div>
  </div>
  <button disabled={!currentProfile.height || !currentProfile.weight || !currentProfile.age} onClick={() => setCurrentPage('dashboard')} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">{t.setupTitle} <ArrowRight size={20} /></button>
 </div>
 </div>
 ) : (
 <div className="animate-in slide-in-from-bottom-4 duration-500">

  <h2 className="text-xl font-black text-slate-800 mb-6">{t.dashboardGreeting}</h2>
 
 {/* Dashboard 統計卡片 */}
 <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-indigo-600 rounded-[40px] p-8 text-white shadow-2xl shadow-teal-50 mb-6 transition-all group">
   <div className="relative z-10">
     <div className="text-xs font-bold opacity-80 mb-2 uppercase tracking-widest flex justify-between">
       <span>{t.remaining} / {nutritionTargets.calories} KCAL</span>
       <button onClick={() => setShowHistoryModal(true)} className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full text-[9px] backdrop-blur-sm transition-all">
         <History size={10} />
         <span>{t.historyTitle}</span>
       </button>
     </div>
     <div className="flex items-baseline gap-2 mb-8"><span className="text-7xl font-black tracking-tighter">{Math.max(0, nutritionTargets.calories - dailyConsumed.calories)}</span><span className="text-sm font-bold opacity-80 uppercase">{t.kcalUnit}</span></div>
     <div className="grid grid-cols-3 gap-5 mb-8">
       <ProgressBar label={t.protein} current={dailyConsumed.protein} target={nutritionTargets.protein} unit="g" />
       <ProgressBar label={t.carbs} current={dailyConsumed.carbs} target={nutritionTargets.carbs} unit="g" />
       <ProgressBar label={t.fat} current={dailyConsumed.fat} target={nutritionTargets.fat} unit="g" />
     </div>
     <div className="bg-black/10 backdrop-blur-md border border-white/10 rounded-[30px] p-5 flex justify-between items-center">
       <div className="cursor-default">
         <div className="text-[10px] font-black opacity-60 uppercase mb-1 tracking-widest">{t.bmi} {nutritionTargets.bmi} | {parseFloat(nutritionTargets.bmi) < 18.5 ? t.statusUnder : parseFloat(nutritionTargets.bmi) < 24 ? t.statusNormal : t.statusOver}</div>
         <div className="flex items-center gap-2"><span className="text-sm font-black tracking-tight">{t.hydrationTimer} {currentProfile.waterIntake}ml / 2000ml</span></div>
       </div>
       <div className="text-right"><button onClick={() => setShowWaterMenu(true)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm active:scale-90 transition-all"><Droplets size={20} fill="currentColor" /></button></div>
     </div>
   </div>
 </div>

 <button onClick={() => setShowAiModal(true)} className="w-full bg-white rounded-[32px] p-5 shadow-sm border border-slate-50 flex items-center justify-between mb-4 group active:scale-[0.98] transition-all"><div className="flex items-center gap-4"><div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500"><Sparkles size={20} /></div><span className="font-black text-slate-800 text-sm">{t.aiRec}</span></div><div className="bg-violet-50 text-violet-500 p-1.5 rounded-full"><Plus size={16} /></div></button>
 <div className="bg-white rounded-[24px] p-2 shadow-sm border border-slate-100 flex items-center mb-8 focus-within:ring-2 focus-within:ring-indigo-100 transition-all"><span className="pl-4 text-violet-400"><Search size={18} /></span><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="flex-1 px-3 bg-transparent border-none outline-none text-base font-bold text-slate-600 placeholder:text-slate-300" /><button onClick={handleAiSearch} disabled={isAiSearching || !searchQuery.trim()} className="bg-violet-600 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:bg-slate-300">{isAiSearching ? <Loader2 size={14} className="animate-spin" /> : null}{isAiSearching ? t.aiSearching : t.aiSearchBtn}</button></div>
 
 {/* Shape & Stretch Button */}
 <button onClick={() => setShowShapeStretch(true)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-[32px] shadow-lg shadow-indigo-200 active:scale-98 transition-all flex items-center justify-between group mb-4">
   <div className="flex items-center gap-4">
     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
        <Zap size={24} fill="currentColor" />
     </div>
     <div className="text-left">
       <h4 className="text-lg font-black mb-0.5">{t.shapeStretchTitle}</h4>
       <p className="text-indigo-100 text-[10px] font-bold opacity-90">{t.shapeStretchDesc}</p>
     </div>
   </div>
   <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
 </button>

 {/* NuVision Button */}
 <button onClick={() => setShowNuVisionModal(true)} className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-5 rounded-[32px] shadow-lg shadow-blue-200 active:scale-98 transition-all flex items-center justify-between group mb-4">
   <div className="flex items-center gap-4">
     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
        <Eye size={24} fill="currentColor" />
     </div>
     <div className="text-left">
       <h4 className="text-lg font-black mb-0.5">NuVision</h4>
       <p className="text-blue-100 text-[10px] font-bold opacity-90">{lang === 'zh' ? 'AI 智能街市助手' : 'AI Smart Market Assistant'}</p>
     </div>
   </div>
   <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
 </button>

 {/* NuVision AI Scanner Button */}
 <button onClick={() => setShowScannerModal(true)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-[32px] shadow-lg shadow-emerald-200 active:scale-98 transition-all flex items-center justify-between group mb-12">
   <div className="flex items-center gap-4">
     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
        <Scan size={24} fill="currentColor" />
     </div>
     <div className="text-left">
       <h4 className="text-lg font-black mb-0.5">{t.nuVisionScannerTitle}</h4>
       <p className="text-emerald-100 text-[10px] font-bold opacity-90">{t.nuVisionScannerDesc}</p>
     </div>
   </div>
   <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
 </button>

 </div>
 )}
 </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black text-lg text-slate-800 flex items-center gap-2"><History size={20} className="text-indigo-500"/> {t.historyTitle}</h3>
              <button onClick={() => setShowHistoryModal(false)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm"><X size={18} /></button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {currentProfile.logs.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3"><Search size={24} className="opacity-50"/></div>
                  <p className="text-xs font-bold">{t.noHistory}</p>
                </div>
              ) : (
                currentProfile.logs.map(log => (
                  <div key={log.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="text-2xl">{log.emoji}</div>
                    <div className="flex-1">
                      <div className="font-black text-slate-700 text-sm mb-1">{getLocalizedValue(log.name)}</div>
                      <div className="text-[10px] font-bold text-slate-400 flex gap-2">
                        <span>🔥 {Math.round(log.calories)}</span>
                        <span>🥩 {Math.round(log.protein)}g</span>
                        <span>🍞 {Math.round(log.carbs)}g</span>
                        <span>🥑 {Math.round(log.fat)}g</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-300 mb-1">{log.time}</div>
                      <button onClick={() => removeLogEntry(log.id)} className="text-rose-400 p-1.5 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Search & Analysis Modal */}
      {showAiModal && (
        <div className="absolute inset-0 bg-white z-[110] flex flex-col animate-in slide-in-from-bottom-full duration-300">
          {selectedDish ? (
            // --- DETAIL VIEW ---
            <>
              <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center sticky top-0 z-10">
                <button onClick={() => setSelectedDish(null)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100"><ArrowLeft size={20} /></button>
                <h3 className="font-black text-lg text-slate-800">{t.foodBriefTitle}</h3>
                <div className="w-10"></div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 pb-32">
                 {/* Dish Info */}
                 <div className="text-center mb-6">
                    <div className="text-6xl mb-4 animate-in zoom-in duration-300">{selectedDish.emoji}</div>
                    <h2 className="text-2xl font-black text-slate-800">{getLocalizedValue(selectedDish.name)}</h2>
                 </div>
                 
                 {/* Ingredients */}
                 <div className="mb-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.ingredients}</h4>
                    <div className="bg-slate-50 p-4 rounded-2xl text-sm font-bold text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {selectedDish.ingredients}
                    </div>
                 </div>

                 {/* Method */}
                 <div className="mb-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.method}</h4>
                    <div className="space-y-2">
                        {selectedDish.method.map((step, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="min-w-[20px] h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black mt-0.5">{i+1}</div>
                                <p className="text-sm font-medium text-slate-600">{step}</p>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Nutrition */}
                 <div className="mb-8">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.nutritionalInfo}</h4>
                    <div className="bg-slate-900 text-white rounded-[24px] p-5">
                       <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                           <span className="text-sm font-bold text-slate-400">{t.calories}</span>
                           <span className="text-2xl font-black">{selectedDish.calories} {t.kcal}</span>
                       </div>
                       <div className="grid grid-cols-3 gap-2 text-center mb-6">
                           <div><div className="text-lg font-bold text-emerald-400">{selectedDish.protein}g</div><div className="text-[10px] text-slate-500">{t.pro}</div></div>
                           <div><div className="text-lg font-bold text-amber-400">{selectedDish.carbs}g</div><div className="text-[10px] text-slate-500">{t.carb}</div></div>
                           <div><div className="text-lg font-bold text-rose-400">{selectedDish.fat}g</div><div className="text-[10px] text-slate-500">{t.fat_label}</div></div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.satFat}</span>
                           <span className="text-xs font-bold">{selectedDish.saturatedFat}g</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.transFat}</span>
                           <span className="text-xs font-bold">{selectedDish.transFat}g</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.sodium}</span>
                           <span className="text-xs font-bold">{selectedDish.sodium}mg</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.sugar}</span>
                           <span className="text-xs font-bold">{selectedDish.sugar}g</span>
                        </div>
                      </div>
                    </div>
                 </div>

                 <button onClick={() => handleAddDish(selectedDish)} className="w-full bg-indigo-600 text-white py-4 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all">
                    {t.addIntake}
                 </button>
              </div>
            </>
          ) : (
            // --- LIST VIEW ---
            <>
              <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center sticky top-0 z-10">
                <button onClick={() => setShowAiModal(false)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100"><ArrowLeft size={20} /></button>
                <h3 className="font-black text-lg text-slate-800">{t.aiRec}</h3>
                <div className="w-10"></div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 pb-32">
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
                  {(['breakfast', 'lunch', 'dinner'] as const).map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${activeCategory === cat ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                      {t[cat]}
                    </button>
                  ))}
                </div>

                {/* Recipe Cards */}
                <div className="space-y-4">
                  {currentCategoryRecipes.map((dish, idx) => (
                    <button key={dish.id} onClick={() => handleSelectDish(dish)} className="w-full bg-white border border-slate-100 rounded-[24px] p-5 flex items-center gap-4 hover:border-indigo-100 hover:shadow-md transition-all group text-left">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">{dish.emoji}</div>
                      <div className="flex-1">
                        <h4 className="font-black text-slate-800 mb-1">{getLocalizedValue(dish.name)}</h4>
                        <div className="flex gap-3 text-[10px] font-bold text-slate-400">
                          <span className="flex items-center gap-1"><Zap size={10} className="text-amber-400" /> {dish.calories} kcal</span>
                          <span className="flex items-center gap-1"><Scale size={10} className="text-emerald-400" /> P: {dish.protein}g</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} /></div>
                    </button>
                  ))}
                </div>

                <button onClick={refreshBatch} className="w-full mt-6 py-4 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-slate-600 transition-all">
                  <RefreshCw size={14} /> {t.refresh}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Water Menu Modal */}
      {showWaterMenu && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowWaterMenu(false)}>
          <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300" onClick={e => e.stopPropagation()}>
            <h3 className="font-black text-lg text-slate-800 mb-6 flex items-center gap-2"><Droplets className="text-cyan-500"/> {t.quickAdd}</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[200, 300, 500].map(amt => (
                <button key={amt} onClick={() => addWater(amt)} className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 py-4 rounded-2xl font-black text-lg transition-colors">
                  +{amt}ml
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <input type="number" value={customWaterVal} onChange={e => setCustomWaterVal(e.target.value)} placeholder={t.customWater} className="flex-1 bg-slate-50 rounded-2xl px-5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-200" />
              <button onClick={() => addWater(customWaterVal)} className="bg-cyan-500 text-white px-6 rounded-2xl font-black shadow-lg shadow-cyan-200 active:scale-95 transition-all">{t.add}</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Result Modal */}
      {aiSearchResult && (
        <div className="absolute inset-0 bg-white z-[120] flex flex-col animate-in slide-in-from-bottom-full duration-300">
           {/* ... Header ... */}
           <div className="p-6 bg-white flex justify-between items-center">
             <button onClick={() => setAiSearchResult(null)} className="p-2 bg-slate-50 rounded-full"><X size={20}/></button>
             <span className="font-black text-lg">{t.aiSub}</span>
             <div className="w-9"></div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 pt-0">
             <div className="text-center mb-8">
               <div className="text-6xl mb-4 animate-in zoom-in duration-300">{aiSearchResult.emoji}</div>
               <h2 className="text-2xl font-black text-slate-800 mb-2">{aiSearchResult.name}</h2>
               <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[80%] mx-auto">{aiSearchResult.brief}</p>
             </div>

             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t.selectPortion}</h3>
             <div className="space-y-3 mb-8">
               {aiSearchResult.portions?.map((p, idx) => (
                 <div key={idx} onClick={() => setSelectedPortion(p)} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedPortion === p ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white'}`}>
                   <div className="flex justify-between items-center mb-1">
                     <span className={`font-bold ${selectedPortion === p ? 'text-indigo-700' : 'text-slate-700'}`}>{p.label}</span>
                     {selectedPortion === p && <Check size={16} className="text-indigo-600"/>}
                   </div>
                   {p.isCustomBase && selectedPortion === p ? (
                      <div className="mt-3 flex items-center gap-3 animate-in fade-in">
                        <input type="number" value={customGramAmount} onClick={e => e.stopPropagation()} onChange={e => setCustomGramAmount(e.target.value)} className="w-24 bg-white border border-indigo-200 rounded-lg px-2 py-1 text-center font-bold text-indigo-700 outline-none" autoFocus />
                        <span className="text-xs font-bold text-indigo-400">g</span>
                      </div>
                   ) : (
                     <div className="text-xs text-slate-400 font-medium">{Math.round(p.calories)} kcal</div>
                   )}
                 </div>
               ))}
             </div>

             {/* Nutrition Preview */}
             {currentAiNutrition && (
               <div className="bg-slate-900 text-white rounded-[32px] p-6 mb-6">
                 <div className="text-center mb-6">
                   <div className="text-4xl font-black mb-1">{currentAiNutrition.calories}</div>
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.kcal}</div>
                 </div>
                 <div className="grid grid-cols-3 gap-4 text-center mb-6">
                   <div><div className="text-xl font-bold text-emerald-400">{currentAiNutrition.protein}</div><div className="text-[10px] text-slate-500">{t.pro}</div></div>
                   <div><div className="text-xl font-bold text-amber-400">{currentAiNutrition.carbs}</div><div className="text-[10px] text-slate-500">{t.carb}</div></div>
                   <div><div className="text-xl font-bold text-rose-400">{currentAiNutrition.fat}</div><div className="text-[10px] text-slate-500">{t.fat_label}</div></div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.satFat}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.saturatedFat}g</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.transFat}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.transFat}g</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.sodium}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.sodium}mg</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.sugar}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.sugar}g</span>
                    </div>
                 </div>
               </div>
             )}
             
             <button onClick={handleAddAiResult} disabled={!selectedPortion} className="w-full bg-indigo-600 text-white py-4 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100">
               {t.addIntake}
             </button>
           </div>
        </div>
      )}

      {/* Refinement Overlay (AI Needs Info) */}
      {refinementPrompt && (
        <div className="absolute inset-0 bg-white z-[130] flex flex-col p-8 justify-center animate-in fade-in">
           <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mb-6"><Info size={32}/></div>
           <h3 className="text-2xl font-black text-slate-800 mb-2">{t.refinementTitle}</h3>
           <p className="text-slate-500 font-medium mb-8">{refinementPrompt}</p>
           <textarea value={refinementDetails} onChange={e => setRefinementDetails(e.target.value)} placeholder={t.refinementPlaceholder} className="w-full h-32 bg-slate-50 rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-6" />
           <div className="flex gap-4">
             <button onClick={() => { setRefinementPrompt(null); setIsAiSearching(false); }} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all">{t.cancel}</button>
             <button onClick={handleAiSearch} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-200 active:scale-95 transition-all">{t.refinementConfirm}</button>
           </div>
        </div>
      )}

      {/* Chat Overlay */}
      {showChatOverlay && (
        <div className="absolute inset-0 bg-white z-[150] flex flex-col animate-in slide-in-from-bottom duration-500">
          <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowChatOverlay(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><ArrowLeft size={20}/></button>
              <div>
                <div className="font-black text-slate-800 text-lg tracking-tight">{t.aiMentorLabel}</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
             {chatMessages.length === 0 && (
               <div className="py-12 text-center">
                 <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-sm"><Brain size={40}/></div>
                 <p className="text-sm font-bold text-slate-400 max-w-[200px] mx-auto leading-relaxed">{t.aiChatWelcome}</p>
               </div>
             )}
             {chatMessages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[85%] p-5 rounded-[24px] text-sm font-bold leading-relaxed whitespace-pre-wrap shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                   {msg.text || <div className="flex gap-1.5 py-1"><div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-100"></div><div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200"></div></div>}
                 </div>
               </div>
             ))}
             <div ref={chatEndRef} />
          </div>
          <div className="p-6 bg-white border-t border-slate-50">
            <div className="flex gap-3">
              <input 
                 type="text" 
                 value={chatInput} 
                 onChange={e => setChatInput(e.target.value)} 
                 onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
                 placeholder={t.aiChatPlaceholder} 
                 className="flex-1 bg-slate-50 border border-slate-100 rounded-[20px] px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                 disabled={isChatLoading}
              />
              <button onClick={handleSendChatMessage} disabled={!chatInput.trim() || isChatLoading} className="w-14 h-14 bg-indigo-600 text-white rounded-[20px] flex items-center justify-center shadow-xl shadow-indigo-100 active:scale-95 transition-all disabled:bg-slate-200 disabled:shadow-none">
                {isChatLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shape & Stretch Modal */}
      {showShapeStretch && (
        <div className="absolute inset-0 bg-slate-50 z-[200] flex flex-col animate-in slide-in-from-right duration-300">
           {/* Header */}
           <div className="bg-white p-4 flex items-center gap-4 shadow-sm z-10">
             <button onClick={() => {
                if (selectedDish) setSelectedDish(null);
                if (selectedShapeCategory) setSelectedShapeCategory(null);
                else setShowShapeStretch(false);
             }} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600">
               <ArrowLeft size={20} />
             </button>
             <h3 className="font-black text-lg text-slate-800">{selectedShapeCategory ? (translations[lang][selectedShapeCategory] || t.shapeStretchTitle) : t.shapeStretchTitle}</h3>
           </div>

           {/* Content */}
           <div className="flex-1 overflow-y-auto p-6">
              {!selectedShapeCategory ? (
                <div className="grid gap-4">
                   {[
                     { id: 'catEye', icon: <Eye size={24}/>, color: 'bg-sky-500', text: 'text-sky-100' },
                     { id: 'catCirculation', icon: <Activity size={24}/>, color: 'bg-rose-500', text: 'text-rose-100' },
                     { id: 'catStress', icon: <Moon size={24}/>, color: 'bg-violet-500', text: 'text-violet-100' },
                     { id: 'catCore', icon: <Shield size={24}/>, color: 'bg-amber-500', text: 'text-amber-100' },
                     { id: 'catSleep', icon: <Moon size={24}/>, color: 'bg-indigo-900', text: 'text-indigo-200' },
                   ].map(cat => (
                     <button key={cat.id} onClick={() => setSelectedShapeCategory(cat.id)} className={`${cat.color} text-white p-6 rounded-[32px] flex items-center gap-4 shadow-lg active:scale-98 transition-all group`}>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="text-lg font-black">{t[cat.id]}</h4>
                          <p className={`text-xs font-bold ${cat.text}`}>{t[`${cat.id}Desc`]}</p>
                        </div>
                        <ChevronRight className="opacity-60" />
                     </button>
                   ))}
                </div>
              ) : (
                <>
                  {/* Filter Tabs */}
                  <div className="flex bg-slate-200 p-1 rounded-2xl mb-6">
                    {(['all', 'stretch', 'exercise'] as const).map(tab => (
                      <button key={tab} onClick={() => setShapeStretchTab(tab)} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${shapeStretchTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
                        {t[`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`]}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 pb-20">
                    {filteredExercises.map(ex => (
                      <div key={ex.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                              {ex.type === 'stretch' ? <Activity size={20}/> : <Zap size={20}/>}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 leading-tight mb-1">{getLocalizedValue(ex.name)}</h4>
                              <div className="flex gap-2 text-[10px] font-bold text-slate-400">
                                <span className="bg-slate-100 px-2 py-0.5 rounded-md">{getLocalizedValue(ex.duration)}</span>
                                <span className="bg-slate-100 px-2 py-0.5 rounded-md">{getLocalizedValue(ex.sets)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Video Player Section with Loop */}
                        {ex.demoVideoUrl ? (
                          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4 relative group">
                             <video 
                               src={ex.demoVideoUrl} 
                               className="w-full h-full object-cover" 
                               controls 
                               loop 
                               playsInline
                               autoPlay={false} 
                               muted={false} 
                             />
                          </div>
                        ) : (
                           <div className="w-full aspect-video bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-300 mb-4 border-2 border-dashed border-slate-200">
                             <Video size={32} className="mb-2 opacity-50"/>
                             <span className="text-xs font-bold">No Preview</span>
                           </div>
                        )}

                        <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 font-medium leading-relaxed mb-3">
                          {getLocalizedValue(ex.instruction)}
                        </div>
                        
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                           <span className="uppercase tracking-wider">Equipment:</span>
                           <span className="text-indigo-500">{t[ex.equipment]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
           </div>
        </div>
      )}

      {/* NuVision Scanner Modal */}
      {showScannerModal && (
        <div className="absolute inset-0 bg-slate-50 z-[260] flex flex-col animate-in slide-in-from-bottom-full duration-300">
          <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-30 sticky top-0">
            <button onClick={() => { setShowScannerModal(false); setScannerResult(null); setScannerImage(null); }} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
              <X size={20} />
            </button>
            <h3 className="font-black text-lg text-slate-800">{t.nuVisionScannerTitle}</h3>
            <div className="w-10"></div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!scannerImage ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center shadow-inner">
                  <Scan size={48} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-2">{t.nuVisionScannerTitle}</h2>
                  <p className="text-slate-400 font-bold text-sm max-w-[250px] mx-auto">{t.nuVisionScannerDesc}</p>
                </div>
                <button 
                  onClick={() => scannerInputRef.current?.click()}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all flex items-center gap-3"
                >
                  <Camera size={20} />
                  {lang === 'zh' ? '拍照或上傳' : 'Take Photo or Upload'}
                </button>
                <input 
                  type="file" 
                  ref={scannerInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const base64 = ev.target?.result as string;
                        setScannerImage(base64);
                        handleScannerAnalyze(base64);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="space-y-6 pb-20">
                <div className="w-full aspect-square bg-slate-200 rounded-[40px] overflow-hidden shadow-inner relative">
                  <img src={scannerImage} className="w-full h-full object-cover" alt="Scanned" />
                  {isScannerAnalyzing && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                      <Loader2 size={48} className="animate-spin mb-4" />
                      <span className="font-black text-lg animate-pulse">{t.aiAnalyzing}</span>
                    </div>
                  )}
                </div>

                {scannerResult && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                    {/* Food Name and Proportion Inputs */}
                    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                          {lang === 'zh' ? '這是什麼食物？' : 'What is this food?'}
                        </label>
                        <input 
                          type="text"
                          value={scannerFoodName}
                          onChange={(e) => setScannerFoodName(e.target.value)}
                          placeholder={scannerResult.name}
                          className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                          {lang === 'zh' ? '食用比例 (例如：0.5 為一半, 2 為兩倍)' : 'Proportion (e.g., 0.5 for half, 2 for double)'}
                        </label>
                        <div className="flex items-center gap-4">
                          <input 
                            type="range"
                            min="0.1"
                            max="5"
                            step="0.1"
                            value={scannerProportion}
                            onChange={(e) => setScannerProportion(parseFloat(e.target.value))}
                            className="flex-1 accent-indigo-600"
                          />
                          <div className="w-16 bg-indigo-50 text-indigo-700 font-black py-2 rounded-xl text-center">
                            {scannerProportion}x
                          </div>
                        </div>
                      </div>
                    </div>

                    {currentAiNutrition && (
                      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 text-center">
                        <div className="text-4xl font-black text-indigo-600 mb-1">{scannerResult.nutritionScore}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.nutritionScore}</div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">{scannerResult.name}</h2>
                        
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {selectedPortion?.label || (lang === 'zh' ? '預設' : 'Default')} ({selectedPortion?.isCustomBase ? customGramAmount : selectedPortion?.weight}g)
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-slate-50 p-3 rounded-2xl">
                            <div className="text-[10px] text-slate-400 mb-1 uppercase font-black">{t.calories}</div>
                            <div className="text-xl font-black text-slate-700">{currentAiNutrition.calories}</div>
                          </div>
                          <div className="bg-emerald-50 p-3 rounded-2xl">
                            <div className="text-[10px] text-emerald-400 mb-1 uppercase font-black">{t.protein}</div>
                            <div className="text-xl font-black text-emerald-700">{currentAiNutrition.protein}g</div>
                          </div>
                          <div className="bg-amber-50 p-3 rounded-2xl">
                            <div className="text-[10px] text-amber-400 mb-1 uppercase font-black">{t.carbs}</div>
                            <div className="text-xl font-black text-amber-700">{currentAiNutrition.carbs}g</div>
                          </div>
                          <div className="bg-rose-50 p-3 rounded-2xl">
                            <div className="text-[10px] text-rose-400 mb-1 uppercase font-black">{t.fat}</div>
                            <div className="text-xl font-black text-rose-700">{currentAiNutrition.fat}g</div>
                          </div>
                        </div>

                        {/* Micros Grid */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 mb-6">
                          <div className="flex justify-between items-center bg-slate-50/50 px-3 py-2 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{t.satFat}</span>
                            <span className="text-xs font-black text-slate-700">{currentAiNutrition.saturatedFat}g</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50/50 px-3 py-2 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{t.transFat}</span>
                            <span className="text-xs font-black text-slate-700">{currentAiNutrition.transFat}g</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50/50 px-3 py-2 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{t.sodium}</span>
                            <span className="text-xs font-black text-slate-700">{currentAiNutrition.sodium}mg</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50/50 px-3 py-2 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{t.sugar}</span>
                            <span className="text-xs font-black text-slate-700">{currentAiNutrition.sugar}g</span>
                          </div>
                        </div>

                        {/* Portion Selection */}
                        {scannerResult.portions && (
                          <div className="space-y-3 mb-6 text-left">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <Scale size={14} /> {lang === 'zh' ? '選擇份量' : 'Select Portion'}
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {scannerResult.portions.map((p: any, i: number) => (
                                <button
                                  key={i}
                                  onClick={() => setSelectedPortion(p)}
                                  className={`p-3 rounded-2xl border-2 transition-all text-left ${selectedPortion?.label === p.label ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                                >
                                  <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{p.label}</div>
                                  <div className="text-sm font-black text-slate-700">{p.weight}g</div>
                                </button>
                              ))}
                              {/* Custom Portion Button */}
                              <button
                                onClick={() => setSelectedPortion({ 
                                  label: lang === 'zh' ? '自定義' : 'Custom', 
                                  weight: parseInt(customGramAmount) || 100,
                                  calories: scannerResult.calories,
                                  protein: scannerResult.protein,
                                  carbs: scannerResult.carbs,
                                  fat: scannerResult.fat,
                                  saturatedFat: scannerResult.saturatedFat,
                                  transFat: scannerResult.transFat,
                                  sodium: scannerResult.sodium,
                                  sugar: scannerResult.sugar,
                                  isCustomBase: true
                                })}
                                className={`p-3 rounded-2xl border-2 transition-all text-left ${selectedPortion?.label === (lang === 'zh' ? '自定義' : 'Custom') ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                              >
                                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{lang === 'zh' ? '自定義' : 'Custom'}</div>
                                <div className="flex items-center gap-1">
                                  <input 
                                    type="number" 
                                    value={customGramAmount}
                                    onChange={(e) => {
                                      setCustomGramAmount(e.target.value);
                                      setSelectedPortion({ 
                                        label: lang === 'zh' ? '自定義' : 'Custom', 
                                        weight: parseInt(e.target.value) || 100,
                                        calories: scannerResult.calories,
                                        protein: scannerResult.protein,
                                        carbs: scannerResult.carbs,
                                        fat: scannerResult.fat,
                                        saturatedFat: scannerResult.saturatedFat,
                                        transFat: scannerResult.transFat,
                                        sodium: scannerResult.sodium,
                                        sugar: scannerResult.sugar,
                                        isCustomBase: true
                                      });
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-12 bg-transparent border-b border-slate-300 focus:border-indigo-500 outline-none text-sm font-black text-slate-700"
                                  />
                                  <span className="text-xs font-bold text-slate-400">g</span>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="text-left space-y-4">
                          <div>
                            <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <Info size={14} /> {lang === 'zh' ? '隱藏陷阱' : 'Hidden Traps'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {scannerResult.hiddenTraps?.map((trap: string, i: number) => (
                                <span key={i} className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-xs font-bold border border-rose-100">{trap}</span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                            <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <Sparkles size={14} /> {lang === 'zh' ? 'AI 建議' : 'AI Suggestion'}
                            </h4>
                            <p className="text-xs text-indigo-700 font-medium leading-relaxed">{scannerResult.aiSuggestion}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={addScannerResultToDaily}
                      className="w-full bg-indigo-600 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <Plus size={20} />
                      {t.addIntake}
                    </button>
                    
                    <button 
                      onClick={() => { setScannerResult(null); setScannerImage(null); }}
                      className="w-full py-4 rounded-[24px] font-black text-slate-400 hover:bg-slate-100 transition-all"
                    >
                      {t.scanNext}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Health History Modal */}
      <AnimatePresence>
        {showHealthHistory && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg h-[80vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <History size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">{lang === 'zh' ? '過往週報' : 'Past Reports'}</h2>
                </div>
                <button onClick={() => setShowHealthHistory(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {(!currentProfile.healthReports || currentProfile.healthReports.length === 0) ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                      <FileText size={40} />
                    </div>
                    <p className="font-bold text-slate-400">{lang === 'zh' ? '目前還沒有過往週報。' : 'No past reports yet.'}</p>
                    <button 
                      onClick={() => { setShowHealthHistory(false); handleGenerateHealthReport(); }}
                      className="text-indigo-600 font-black text-sm hover:underline"
                    >
                      {lang === 'zh' ? '立即生成第一份報告' : 'Generate your first report now'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentProfile.healthReports.map((report) => (
                      <div 
                        key={report.id}
                        className="p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{report.title}</h3>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-1">
                              <Calendar size={10} />
                              {new Date(report.date).toLocaleDateString(lang === 'zh' ? 'zh-TW' : 'en-US')} {new Date(report.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button 
                              onClick={() => {
                                setHealthReportContent(report.content);
                                setShowHealthReport(true);
                                setShowHealthHistory(false);
                              }}
                              className="w-8 h-8 bg-white text-slate-400 rounded-full flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm"
                              title={lang === 'zh' ? '查看' : 'View'}
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={async () => {
                                setHealthReportContent(report.content);
                                // Wait for state update and DOM render
                                setTimeout(downloadHealthReportPDF, 100);
                              }}
                              className="w-8 h-8 bg-white text-slate-400 rounded-full flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
                              title={lang === 'zh' ? '下載 PDF' : 'Download PDF'}
                            >
                              <Download size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                setProfiles(prev => prev.map(p => 
                                  p.id === currentProfile.id 
                                    ? { ...p, healthReports: p.healthReports?.filter(r => r.id !== report.id) }
                                    : p
                                ));
                              }}
                              className="w-8 h-8 bg-white text-slate-400 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
                              title={lang === 'zh' ? '刪除' : 'Delete'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed opacity-70">
                          {report.content.replace(/[#*`]/g, '').substring(0, 120)}...
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NuVision Modal */}
      {showNuVisionModal && (
        <div className="absolute inset-0 bg-slate-50 z-[250] flex flex-col animate-in slide-in-from-bottom-full duration-300">
           {/* Header */}
           <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-30 sticky top-0">
             <button onClick={() => { setShowNuVisionModal(false); setNuVisionResult(null); setNuVisionCart([]); setNuVisionSearchItem(null); setNuVisionSearchQuery(''); }} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
               <X size={20} />
             </button>
             <h3 className="font-black text-lg text-slate-800">{t.nuVisionTitle}</h3>
             <div className="w-10"></div>
           </div>

           <div className="flex-1 overflow-y-auto bg-slate-50 relative">
              {!nuVisionResult ? (
                <div className="flex flex-col min-h-full pb-32">
                   {/* Welcome & Budget Header */}
                   <div className="bg-white p-6 rounded-b-[32px] shadow-sm mb-6">
                     <div className="text-center mb-6">
                       <h2 className="text-2xl font-black text-slate-800 mb-2">{t.marketChallenge}</h2>
                       <div className="flex items-center justify-center gap-3">
                         <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 shadow-inner group focus-within:border-indigo-500 transition-all">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'zh' ? '設定預算' : 'Set Budget'}</span>
                           <div className="flex items-center gap-2">
                             <button 
                               onClick={() => setNuVisionBudget(prev => Math.max(0, prev - 5))}
                               className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-90"
                             >
                               <Minus size={14} strokeWidth={3} />
                             </button>
                             <div className="flex items-center gap-1">
                               <span className="text-lg font-black text-indigo-600">$</span>
                               <input 
                                 type="number"
                                 value={nuVisionBudget}
                                 onChange={(e) => setNuVisionBudget(Number(e.target.value))}
                                 className="w-16 bg-transparent text-lg font-black text-indigo-600 outline-none focus:ring-0 text-center"
                               />
                             </div>
                             <button 
                               onClick={() => setNuVisionBudget(prev => prev + 5)}
                               className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-90"
                             >
                               <Plus size={14} strokeWidth={3} />
                             </button>
                           </div>
                         </div>
                         <div className="hidden sm:flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                           <Target size={12} />
                           {lang === 'zh' ? '目標：均衡一餐' : 'Goal: Balanced Meal'}
                         </div>
                       </div>
                     </div>

                     {/* Budget Progress */}
                     <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.remainingBudget}</div>
                             <div className={`text-3xl font-black tracking-tight ${nuVisionBudget - nuVisionCart.reduce((sum, id) => {
                              const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
                               const itemPrice = (item?.price || 0) * (item?.quantity || 1) * ((item?.portion || 100) / (item?.basePortion || 100));
                               return sum + itemPrice;
                            }, 0) < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                              ${nuVisionBudget - nuVisionCart.reduce((sum, id) => {
                                const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
                                const itemPrice = (item?.price || 0) * (item?.quantity || 1) * ((item?.portion || 100) / (item?.basePortion || 100));
                               return sum + itemPrice;
                              }, 0)}
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-1">
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.selectedItems}</div>
                             <div className="flex items-center gap-1.5">
                               <div className="text-xl font-black text-indigo-600">{nuVisionCart.length}</div>
                               <div className="text-slate-300 text-sm font-bold">/</div>
                               <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-1 py-0.5 shadow-sm focus-within:border-indigo-500 transition-all">
                                 <button 
                                   onClick={() => setNuVisionMaxItems(prev => Math.max(1, prev - 1))}
                                   className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90"
                                 >
                                   <Minus size={10} strokeWidth={3} />
                                 </button>
                                 <input 
                                   type="number" 
                                   value={nuVisionMaxItems} 
                                   onChange={(e) => setNuVisionMaxItems(Math.max(1, Number(e.target.value)))}
                                   className="w-6 bg-transparent text-sm font-black text-indigo-600 outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                 />
                                 <button 
                                   onClick={() => setNuVisionMaxItems(prev => prev + 1)}
                                   className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90"
                                 >
                                   <Plus size={10} strokeWidth={3} />
                                 </button>
                               </div>
                               <span className="text-slate-300 text-[10px] font-bold uppercase tracking-wider ml-1">{lang === 'zh' ? '件食材' : 'Items'}</span>
                             </div>
                             {nuVisionCart.length > 0 && (
                               <button 
                                 onClick={() => {
                                   setIsNuVisionBasketOpen(!isNuVisionBasketOpen);
                                   if (!isNuVisionBasketOpen) {
                                     setTimeout(() => {
                                       const basketElement = document.getElementById('nuvision-basket');
                                       basketElement?.scrollIntoView({ behavior: 'smooth' });
                                     }, 100);
                                   }
                                 }}
                                 className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg transition-all ${isNuVisionBasketOpen ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'}`}
                               >
                                 {isNuVisionBasketOpen ? <X size={10} /> : <Edit2 size={10} />}
                                 {isNuVisionBasketOpen ? (lang === 'zh' ? '收起清單' : 'Close Basket') : t.adjustQuantities}
                               </button>
                             )}
                          </div>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full transition-all duration-500 ${nuVisionBudget - nuVisionCart.reduce((sum, id) => {
                               const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
                               const itemPrice = (item?.price || 0) * (item?.quantity || 1) * ((item?.portion || 100) / (item?.basePortion || 100));
                               return sum + itemPrice;
                             }, 0) < 10 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                             style={{ width: `${(nuVisionCart.reduce((sum, id) => {
                               const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
                               const itemPrice = (item?.price || 0) * (item?.quantity || 1) * ((item?.portion || 100) / (item?.basePortion || 100));
                               return sum + itemPrice;
                             }, 0) / nuVisionBudget) * 100}%` }}
                           ></div>
                        </div>
                     </div>
                   </div>

                   {/* Basket Items (Moved back to original position) */}
                   {nuVisionCart.length > 0 && (
                     <div id="nuvision-basket" className="px-6 mb-6">
                       <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                         <div className="bg-slate-50/50 px-5 py-3 flex justify-between items-center border-b border-slate-100">
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                             {lang === 'zh' ? '購物籃' : 'Shopping Basket'} ({nuVisionCart.length})
                           </div>
                           <button 
                             onClick={() => setNuVisionCart([])} 
                             className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 px-2 py-1 rounded-lg transition-all"
                           >
                             {t.clearCart}
                           </button>
                         </div>
                         <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto scrollbar-hide">
                           {nuVisionCart.map(id => {
                             const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
                             if (!item) return null;
                             const currentPrice = Math.round((item.price || 0) * (item.quantity || 1) * ((item.portion || 100) / (item.basePortion || 100)));
                             
                             return (
                               <div key={id} className="bg-slate-50/30 rounded-[24px] p-3 border border-slate-50 hover:border-indigo-100 hover:bg-white transition-all group">
                                 <div className="flex flex-col gap-3">
                                   <div className="flex items-center justify-between">
                                     <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg">
                                         {item.emoji || '🛒'}
                                       </div>
                                       <div className="text-xs font-black text-slate-800">{getLocalizedValue(item.name)}</div>
                                     </div>
                                     <div className="text-xs font-black text-emerald-600">${currentPrice}</div>
                                   </div>

                                   <div className="grid grid-cols-2 gap-2">
                                     {/* Quantity Column */}
                                     <div className="flex items-center justify-between bg-white rounded-xl border border-slate-100 p-1 px-2">
                                       <span className="text-[9px] font-black text-slate-400 uppercase">{lang === 'zh' ? '數量' : 'Qty'}</span>
                                       <div className="flex items-center gap-2">
                                         <button 
                                           onClick={() => {
                                             const newQty = Math.max(1, (item.quantity || 1) - 1);
                                             setNuVisionCustomItems(prev => {
                                               const exists = prev.find(i => i.id === id);
                                               if (exists) return prev.map(i => i.id === id ? { ...i, quantity: newQty } : i);
                                               return [...prev, { ...item, quantity: newQty }];
                                             });
                                           }}
                                           className="w-5 h-5 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                         >
                                           <Minus size={10} strokeWidth={3} />
                                         </button>
                                         <span className="text-[11px] font-black text-indigo-600 w-3 text-center">{item.quantity || 1}</span>
                                         <button 
                                           onClick={() => {
                                             const newQty = (item.quantity || 1) + 1;
                                             setNuVisionCustomItems(prev => {
                                               const exists = prev.find(i => i.id === id);
                                               if (exists) return prev.map(i => i.id === id ? { ...i, quantity: newQty } : i);
                                               return [...prev, { ...item, quantity: newQty }];
                                             });
                                           }}
                                           className="w-5 h-5 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                         >
                                           <Plus size={10} strokeWidth={3} />
                                         </button>
                                       </div>
                                     </div>

                                     {/* Portion Column */}
                                     <div className="flex items-center justify-between bg-white rounded-xl border border-slate-100 p-1 px-2">
                                       <span className="text-[9px] font-black text-slate-400 uppercase">{lang === 'zh' ? '份量' : 'Size'}</span>
                                       <div className="flex items-center gap-1">
                                         <button 
                                           onClick={() => {
                                             const step = item.unit === 'g' ? 50 : 1;
                                             const newPortion = Math.max(step, (item.portion || 100) - step);
                                             setNuVisionCustomItems(prev => {
                                               const exists = prev.find(i => i.id === id);
                                               if (exists) return prev.map(i => i.id === id ? { ...i, portion: newPortion } : i);
                                               return [...prev, { ...item, portion: newPortion }];
                                             });
                                           }}
                                           className="w-5 h-5 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                         >
                                           <Minus size={10} strokeWidth={3} />
                                         </button>
                                         <span className="text-[10px] font-black text-indigo-600 min-w-[30px] text-center">
                                           {item.portion || 100}{item.unit || 'g'}
                                         </span>
                                         <button 
                                           onClick={() => {
                                             const step = item.unit === 'g' ? 50 : 1;
                                             const newPortion = (item.portion || 100) + step;
                                             setNuVisionCustomItems(prev => {
                                               const exists = prev.find(i => i.id === id);
                                               if (exists) return prev.map(i => i.id === id ? { ...i, portion: newPortion } : i);
                                               return [...prev, { ...item, portion: newPortion }];
                                             });
                                           }}
                                           className="w-5 h-5 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                         >
                                           <Plus size={10} strokeWidth={3} />
                                         </button>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             );
                           })}
                         </div>
                       </div>
                     </div>
                   )}

                   {/* Basket Items (Moved to bottom) */}
                   {/* Search Bar */}
                    <div className="px-6 mb-6">
                      <div className="relative group flex gap-2">
                        <div className="relative flex-1">
                          <input 
                            type="text" 
                            value={nuVisionSearchQuery}
                            onChange={(e) => setNuVisionSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNuVisionSearch()}
                            placeholder={lang === 'zh' ? '搜尋食材價格 (如：日本雞蛋、澳洲西冷)...' : 'Search food prices (e.g., Japanese eggs, Australian sirloin)...'}
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-24 text-sm font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm group-hover:border-slate-200"
                          />
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                            <Search size={18} />
                          </div>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button 
                              onClick={handleNuVisionSearch}
                              disabled={isNuVisionSearching || isNuVisionPhotoSearching || !nuVisionSearchQuery.trim()}
                              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none"
                            >
                              {isNuVisionSearching ? <Loader2 size={14} className="animate-spin" /> : (lang === 'zh' ? '搜尋' : 'Search')}
                            </button>
                            <button 
                              onClick={() => nuVisionPhotoSearchFileRef.current?.click()}
                              disabled={isNuVisionPhotoSearching || isNuVisionSearching}
                              className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50"
                            >
                              {isNuVisionPhotoSearching ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                            </button>
                          </div>
                        </div>
                        <input 
                          type="file" 
                          ref={nuVisionPhotoSearchFileRef} 
                          onChange={handleNuVisionPhotoSearch} 
                          accept="image/*" 
                          capture="environment" 
                          className="hidden" 
                        />
                      </div>
                    </div>

                   {/* Search Result Card */}
                   {nuVisionSearchItem && (
                     <div className="px-6 mb-6 animate-in slide-in-from-top-4 duration-300">
                       <div className="bg-white rounded-[32px] p-6 border-2 border-indigo-100 shadow-xl shadow-indigo-100/20 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                         <button 
                           onClick={() => setNuVisionSearchItem(null)}
                           className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors"
                         >
                           <X size={16} />
                         </button>
                         
                         <div className="flex items-center gap-4 mb-4 relative z-10">
                           <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                             {nuVisionSearchItem.emoji}
                           </div>
                           <div className="flex-1">
                             <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-0.5">{nuVisionSearchItem.category}</div>
                             <input 
                               type="text"
                               value={nuVisionSearchItem.name}
                               onChange={(e) => setNuVisionSearchItem({...nuVisionSearchItem, name: e.target.value})}
                               className="text-xl font-black text-slate-800 bg-transparent border-b border-dashed border-slate-200 focus:border-indigo-500 outline-none w-full"
                             />
                           </div>
                         </div>
                         
                         <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
                           <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'zh' ? '份量' : 'Portion'}</div>
                             <input 
                               type="text"
                               value={nuVisionSearchItem.portion || ''}
                               onChange={(e) => setNuVisionSearchItem({...nuVisionSearchItem, portion: e.target.value})}
                               className="text-lg font-black text-indigo-600 bg-transparent outline-none w-full"
                               placeholder="e.g. 100g"
                             />
                           </div>
                           <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'zh' ? '價格 (HKD)' : 'Price (HKD)'}</div>
                             <div className="flex items-center gap-1">
                               <span className="font-black text-emerald-600">$</span>
                               <input 
                                 type="number"
                                 value={nuVisionSearchItem.price}
                                 onChange={(e) => setNuVisionSearchItem({...nuVisionSearchItem, price: Number(e.target.value)})}
                                 className="text-xl font-black text-emerald-600 bg-transparent outline-none w-full"
                               />
                             </div>
                           </div>
                         </div>
                         
                         <div className="flex justify-between items-center relative z-10">
                           <div className="flex gap-2">
                             <div className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500">P: {nuVisionSearchItem.protein}g</div>
                             <div className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500">C: {nuVisionSearchItem.carbs}g</div>
                             <div className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500">F: {nuVisionSearchItem.fat}g</div>
                           </div>
                           <button 
                             onClick={() => {
                               toggleNuVisionItem(nuVisionSearchItem.id, nuVisionSearchItem);
                             }}
                             className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${nuVisionCart.includes(nuVisionSearchItem.id) ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'}`}
                           >
                             {nuVisionCart.includes(nuVisionSearchItem.id) ? (lang === 'zh' ? '移除' : 'Remove') : (lang === 'zh' ? '加入清單' : 'Add to List')}
                           </button>
                         </div>
                       </div>
                     </div>
                   )}
                   
                   {/* Category Tabs */}
                   <div className="px-6 mb-6 sticky top-0 z-20 bg-slate-50 py-2 -mx-2 overflow-x-auto flex gap-2 scrollbar-hide">
                      <button onClick={() => setNuVisionCategory('all')} className={`px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${nuVisionCategory === 'all' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100'}`}>{t.all}</button>
                      {Object.entries({ grains: t.grains, meat: t.meat, fruits: t.fruits, veggies: t.veggies }).map(([key, label]) => (
                        <button key={key} onClick={() => setNuVisionCategory(key)} className={`px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${nuVisionCategory === key ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100'}`}>
                          {label}
                        </button>
                      ))}
                   </div>

                   {/* Food Grid */}
                   <div className="px-6 grid grid-cols-2 gap-4">
                     {Object.entries(NUVISION_ITEMS).map(([catKey, items]) => {
                       if (nuVisionCategory !== 'all' && nuVisionCategory !== catKey) return null;
                       return items.map((item: any) => {
                         const isSelected = nuVisionCart.includes(item.id);
                         return (
                           <button 
                             key={item.id} 
                             onClick={() => toggleNuVisionItem(item.id)}
                             className={`relative p-4 rounded-[24px] border-2 transition-all flex flex-col items-center text-center group ${isSelected ? 'bg-indigo-50 border-indigo-500 shadow-lg shadow-indigo-100 scale-[1.02]' : 'bg-white border-transparent shadow-sm hover:shadow-md hover:scale-[1.02]'}`}
                           >
                             <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                             <div className={`font-black text-sm mb-1 ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>{getLocalizedValue(item.name)}</div>
                             <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">${item.price}</div>
                             
                             {isSelected && (
                               <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-md animate-in zoom-in duration-200">
                                 <Check size={14} strokeWidth={3} />
                               </div>
                             )}
                           </button>
                         );
                       });
                     })}
                   </div>
                </div>
              ) : (
                <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4">
                   {/* Score Card */}
                   <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-[32px] p-8 text-white text-center shadow-lg shadow-blue-200 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-6xl font-black mb-2 tracking-tighter">{nuVisionResult.score}</div>
                        <div className="text-xs font-bold opacity-80 uppercase tracking-widest mb-6">{t.nutritionScore}</div>
                        <p className="text-sm font-medium leading-relaxed opacity-90 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                          {nuVisionResult.summary}
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                   </div>

                   {/* Macros */}
                   <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t.macroRatio}</h4>
                      <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-4">
                         <div className="bg-emerald-400 h-full" style={{ width: nuVisionResult.macros?.protein || '33%' }}></div>
                         <div className="bg-amber-400 h-full" style={{ width: nuVisionResult.macros?.carbs || '33%' }}></div>
                         <div className="bg-rose-400 h-full" style={{ width: nuVisionResult.macros?.fat || '33%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> {t.protein} {nuVisionResult.macros?.protein}</div>
                         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div> {t.carbs} {nuVisionResult.macros?.carbs}</div>
                         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-400"></div> {t.fat} {nuVisionResult.macros?.fat}</div>
                      </div>
                   </div>

                   {/* Deep Analysis (The Bad Stuff) */}
                   <div className="bg-slate-50 p-6 rounded-[24px]">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t.deepAnalysis}</h4>
                      <div className="grid grid-cols-2 gap-4">
                         {[
                           { label: t.satFat, val: nuVisionResult.micros?.saturatedFat, color: 'text-rose-500' },
                           { label: t.transFat, val: nuVisionResult.micros?.transFat, color: 'text-rose-600' },
                           { label: t.sodium, val: nuVisionResult.micros?.sodium, color: 'text-amber-600' },
                           { label: t.sugar, val: nuVisionResult.micros?.sugar, color: 'text-amber-500' },
                         ].map((item, i) => (
                           <div key={i} className="bg-white p-3 rounded-xl border border-slate-100">
                              <div className="text-[10px] text-slate-400 mb-1">{item.label}</div>
                              <div className={`font-black ${item.color}`}>{item.val}</div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Hidden Nutrients (The Good Stuff) */}
                   <div className="bg-indigo-50 p-6 rounded-[24px] border border-indigo-100">
                      <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14}/> {t.hiddenNutrients}</h4>
                      <div className="space-y-3">
                         {nuVisionResult.hiddenNutrients?.map((item: any, i: number) => (
                           <div key={i} className="flex gap-3 items-start">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-indigo-500 font-black text-xs shadow-sm mt-0.5">{i+1}</div>
                              <div>
                                 <div className="font-bold text-indigo-900 text-sm">{item.food}</div>
                                 <div className="text-xs text-indigo-700 leading-relaxed">{item.benefit}</div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Advice */}
                   <div className="bg-emerald-50 p-6 rounded-[24px] border border-emerald-100">
                      <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Brain size={14}/> {t.aiAdvice}</h4>
                      <p className="text-sm font-medium text-emerald-800 leading-relaxed">
                         {nuVisionResult.advice}
                      </p>
                   </div>

                   <button onClick={() => { setNuVisionResult(null); setNuVisionCart([]); }} className="w-full py-4 rounded-[24px] font-black text-slate-400 hover:bg-slate-100 transition-all">
                     {t.scanNext}
                   </button>
                </div>
              )}
           </div>

           {/* Floating Analyze Button (Only show when not analyzing result) */}

           <div id="nuvision-basket-marker"></div>
           {!nuVisionResult && (
             <div className="absolute bottom-6 left-6 right-6 z-40">
               <button 
                 onClick={handleNuVisionAnalyze} 
                 disabled={nuVisionCart.length < 3 || isNuVisionAnalyzing} 
                 className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3"
               >
                  {isNuVisionAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-yellow-300" />}
                  {isNuVisionAnalyzing ? t.aiAnalyzing : (
                    <div className="flex items-center gap-2">
                       <span>{t.aiAnalyzeBtn}</span>
                       <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm">
                         ${nuVisionCart.reduce((sum, id) => {
                           const item = nuVisionCustomItems.find(i => i.id === id) || Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
                           const itemPrice = (item?.price || 0) * (item?.quantity || 1) * ((item?.portion || 100) / (item?.basePortion || 100));
                           return sum + Math.round(itemPrice);
                         }, 0)}
                       </span>
                    </div>
                  )}
               </button>
             </div>
           )}
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowProgressModal(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 duration-500">
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t.progress}</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{currentProfile.name}</p>
              </div>
              <button onClick={() => setShowProgressModal(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-12 space-y-8 scrollbar-hide">
              {/* Digital Twin Section */}
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-[32px] p-6 border border-indigo-100 relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-6">
                  <div className="relative">
                    <DigitalTwin 
                      config={currentProfile.avatarConfig || {
                        skinTone: '#FFDBAC',
                        hairStyle: 'short',
                        hairColor: '#4B2C20',
                        clothingColor: '#4F46E5',
                        expression: 'smile'
                      }} 
                      size="md" 
                    />
                    <button 
                      onClick={() => setShowAvatarCustomizer(true)}
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors border border-indigo-100"
                    >
                      <Palette size={14} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-indigo-900 mb-1">{t.digitalTwin}</h3>
                    <p className="text-xs text-indigo-700/70 leading-relaxed font-medium">
                      {currentProfile.waterIntake >= 1500 && dailyConsumed.calories >= nutritionTargets.calories * 0.8 
                        ? (lang === 'zh' ? '你現在充滿活力！水分與營養非常充足。' : 'You are full of energy! Hydration and nutrition are excellent.')
                        : (lang === 'zh' ? '看起來需要補充一點能量或水分喔。' : 'Looks like you need some energy or hydration.')}
                    </p>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl"></div>
              </div>

              {/* Hydration Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Droplets size={16} />
                    <h3 className="text-xs font-black uppercase tracking-widest">{t.water}</h3>
                  </div>
                  <div className="text-xs font-black text-slate-600">
                    {currentProfile.waterIntake} / {nutritionTargets.waterGoal} ml
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(100, (currentProfile.waterIntake / nutritionTargets.waterGoal) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Weight Tracking Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Scale size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">{t.weightHistory}</h3>
                </div>

                {/* Weight Goal Progress Bar */}
                {currentProfile.weightHistory.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">{t.weightGoalProgress}</span>
                      <span className="text-[10px] font-black text-indigo-600">
                        {(() => {
                          const startWeight = currentProfile.weightHistory[0].weight;
                          const currentWeight = parseFloat(currentProfile.weight);
                          const targetWeight = parseFloat(currentProfile.targetWeight);
                          if (startWeight === targetWeight) return '100%';
                          const progress = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;
                          return `${Math.max(0, Math.min(100, Math.round(progress)))}%`;
                        })()}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: (() => {
                            const startWeight = currentProfile.weightHistory[0].weight;
                            const currentWeight = parseFloat(currentProfile.weight);
                            const targetWeight = parseFloat(currentProfile.targetWeight);
                            if (startWeight === targetWeight) return '100%';
                            const progress = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;
                            return `${Math.max(0, Math.min(100, progress))}%`;
                          })()
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{t.currentWeight}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-800">{currentProfile.weight}</span>
                      <span className="text-xs font-bold text-slate-400">kg</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{t.targetWeight}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-indigo-600">{currentProfile.targetWeight}</span>
                      <span className="text-xs font-bold text-slate-400">kg</span>
                    </div>
                  </div>
                </div>

                {/* Add Weight Input */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input 
                      type="number" 
                      value={newWeightInput}
                      onChange={(e) => setNewWeightInput(e.target.value)}
                      placeholder={t.currentWeight}
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300">kg</span>
                  </div>
                  <button 
                    onClick={() => addWeightEntry(parseFloat(newWeightInput))}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 active:scale-95 transition-all"
                  >
                    {t.add}
                  </button>
                </div>

                {/* Target Weight Input */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input 
                      type="number" 
                      value={targetWeightInput}
                      onChange={(e) => setTargetWeightInput(e.target.value)}
                      placeholder={t.targetWeight}
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300">kg</span>
                  </div>
                  <button 
                    onClick={() => { updateTargetWeight(targetWeightInput); setTargetWeightInput(''); }}
                    className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-slate-200 active:scale-95 transition-all"
                  >
                    {t.set}
                  </button>
                </div>
              </div>

              {/* Weight Trend Chart */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <TrendingUp size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">{t.weightTrend}</h3>
                </div>
                <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm h-64 w-full">
                  {currentProfile.weightHistory.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentProfile.weightHistory}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="date" 
                          hide 
                        />
                        <YAxis 
                          domain={['dataMin - 2', 'dataMax + 2']} 
                          hide 
                        />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-slate-800 text-white p-2 rounded-lg text-[10px] font-bold shadow-xl">
                                  <div>{new Date(payload[0].payload.date).toLocaleDateString()}</div>
                                  <div className="text-indigo-300">{payload[0].value} kg</div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#4f46e5" 
                          strokeWidth={4} 
                          dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 8, fill: '#4f46e5', strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                      <History size={32} opacity={0.5} />
                      <p className="text-xs font-bold">{lang === 'zh' ? '需要更多數據來顯示趨勢' : 'Need more data to show trend'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Other Feasible Features: BMI & Health Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100">
                  <div className="text-[10px] font-black text-emerald-400 uppercase mb-1">BMI</div>
                  <div className="text-2xl font-black text-emerald-700">{nutritionTargets.bmi}</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">
                    {parseFloat(nutritionTargets.bmi) < 18.5 ? (lang === 'zh' ? '過輕' : 'Underweight') : 
                     parseFloat(nutritionTargets.bmi) < 24 ? (lang === 'zh' ? '正常' : 'Normal') : (lang === 'zh' ? '過重' : 'Overweight')}
                  </div>
                </div>
                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100">
                  <div className="text-[10px] font-black text-amber-400 uppercase mb-1">{t.calories}</div>
                  <div className="text-2xl font-black text-amber-700">{dailyConsumed.calories}</div>
                  <div className="text-[10px] font-bold text-amber-600 mt-1">/ {nutritionTargets.calories} kcal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Customizer Modal */}
      {showAvatarCustomizer && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowAvatarCustomizer(false)}></div>
          <div className="relative w-full max-w-md bg-slate-50 rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 duration-500 border border-white/20">
            <div className="px-8 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-md z-10">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t.customizeAvatar}</h2>
              <button onClick={() => setShowAvatarCustomizer(false)} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-100">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-12 space-y-8 scrollbar-hide">
              {/* Preview - Apple Style */}
              <div className="flex justify-center py-12 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <DigitalTwin 
                  config={currentProfile.avatarConfig} 
                  size="lg" 
                />
              </div>

              {/* Customization Options */}
              <div className="space-y-8">
                {/* Upload Memoji Section */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{lang === 'zh' ? '自訂 Memoji' : 'Custom Memoji'}</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => avatarInputRef.current?.click()}
                      className="flex-1 py-4 px-6 bg-white border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-3 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all group"
                    >
                      <Camera size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-wider">{lang === 'zh' ? '上傳 Memoji' : 'Upload Memoji'}</span>
                    </button>
                    {currentProfile.avatarConfig?.imageUrl && (
                      <button
                        onClick={removeAvatarImage}
                        className="w-14 h-14 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center hover:bg-red-100 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={avatarInputRef} 
                    onChange={handleAvatarUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <p className="text-[10px] text-slate-400 leading-relaxed italic">
                    {lang === 'zh' ? '提示：在 iPhone 上打開「訊息」，選擇 Memoji 貼圖並儲存為圖片，然後在此上傳。' : 'Tip: Open Messages on iPhone, select a Memoji sticker, save it as an image, and upload here.'}
                  </p>
                </div>

                {/* Skin Tone */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.skinTone}</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {['#FFDBAC', '#F1C27D', '#E0AC69', '#8D5524', '#C68642'].map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          const newProfiles = profiles.map(p => 
                            p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, skinTone: color } } : p
                          );
                          setProfiles(newProfiles);
                        }}
                        className={`w-12 h-12 rounded-full border-4 transition-all active:scale-90 ${currentProfile.avatarConfig?.skinTone === color ? 'border-indigo-600 shadow-lg scale-110' : 'border-white shadow-sm'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Hair Style */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.hairStyle}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['short', 'long', 'curly', 'ponytail', 'mohawk', 'bald'].map(style => (
                      <button
                        key={style}
                        onClick={() => {
                          const newProfiles = profiles.map(p => 
                            p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, hairStyle: style } } : p
                          );
                          setProfiles(newProfiles);
                        }}
                        className={`py-3 px-2 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${currentProfile.avatarConfig?.hairStyle === style ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'}`}
                      >
                        {t[style] || style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Color */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.hairColor}</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {['#4B2C20', '#2C1B18', '#A52A2A', '#D2B48C', '#F5F5DC', '#808080'].map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          const newProfiles = profiles.map(p => 
                            p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, hairColor: color } } : p
                          );
                          setProfiles(newProfiles);
                        }}
                        className={`w-12 h-12 rounded-full border-4 transition-all active:scale-90 ${currentProfile.avatarConfig?.hairColor === color ? 'border-indigo-600 shadow-lg scale-110' : 'border-white shadow-sm'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Clothing Color */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.clothingColor}</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'].map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          const newProfiles = profiles.map(p => 
                            p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, clothingColor: color } } : p
                          );
                          setProfiles(newProfiles);
                        }}
                        className={`w-12 h-12 rounded-full border-4 transition-all active:scale-90 ${currentProfile.avatarConfig?.clothingColor === color ? 'border-indigo-600 shadow-lg scale-110' : 'border-white shadow-sm'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{lang === 'zh' ? '配件' : 'Accessories'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        const newProfiles = profiles.map(p => 
                          p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, glasses: !p.avatarConfig.glasses } } : p
                        );
                        setProfiles(newProfiles);
                      }}
                      className={`py-4 px-4 rounded-3xl flex items-center gap-3 transition-all ${currentProfile.avatarConfig?.glasses ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 border border-slate-100'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${currentProfile.avatarConfig?.glasses ? 'bg-white/20' : 'bg-slate-100'}`}>
                        <Glasses size={18} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">{lang === 'zh' ? '眼鏡' : 'Glasses'}</span>
                    </button>
                    <button
                      onClick={() => {
                        const newProfiles = profiles.map(p => 
                          p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, earrings: !p.avatarConfig.earrings } } : p
                        );
                        setProfiles(newProfiles);
                      }}
                      className={`py-4 px-4 rounded-3xl flex items-center gap-3 transition-all ${currentProfile.avatarConfig?.earrings ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 border border-slate-100'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${currentProfile.avatarConfig?.earrings ? 'bg-white/20' : 'bg-slate-100'}`}>
                        <Sparkles size={18} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">{lang === 'zh' ? '耳環' : 'Earrings'}</span>
                    </button>
                  </div>
                </div>

                {/* Expression */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.expression}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['smile', 'neutral', 'surprised'].map(exp => (
                      <button
                        key={exp}
                        onClick={() => {
                          const newProfiles = profiles.map(p => 
                            p.id === currentProfile.id ? { ...p, avatarConfig: { ...p.avatarConfig, expression: exp } } : p
                          );
                          setProfiles(newProfiles);
                        }}
                        className={`py-3 px-2 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${currentProfile.avatarConfig?.expression === exp ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'}`}
                      >
                        {t[exp]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50/80 backdrop-blur-md border-t border-slate-100">
              <button 
                onClick={() => setShowAvatarCustomizer(false)}
                className="w-full py-4 bg-indigo-600 text-white rounded-[24px] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Health Report Modal */}
      <AnimatePresence>
        {showHealthReport && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHealthReport(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800">{t.healthReport}</h2>
                    {!isGeneratingReport && (
                      <button 
                        onClick={() => { setShowHealthReport(false); setShowHealthHistory(true); }}
                        className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                      >
                        {lang === 'zh' ? '查看過往週報' : 'View Past Reports'}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isGeneratingReport && healthReportContent && (
                    <button 
                      onClick={downloadHealthReportPDF}
                      className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors"
                      title={lang === 'zh' ? '下載 PDF' : 'Download PDF'}
                    >
                      <Download size={20} />
                    </button>
                  )}
                  <button onClick={() => setShowHealthReport(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 prose prose-slate prose-sm max-w-none">
                {isGeneratingReport ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 size={48} className="text-indigo-600 animate-spin" />
                    <p className="font-black text-slate-400 animate-pulse">{lang === 'zh' ? 'AI 正在生成報告...' : 'AI Generating Report...'}</p>
                  </div>
                ) : (
                  <div id="health-report-content" className="markdown-body bg-white p-4 rounded-2xl">
                    <ReactMarkdown>{healthReportContent}</ReactMarkdown>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => setShowHealthReport(false)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-[24px] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                >
                  {t.back}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Modal (Gamification) */}
      <AnimatePresence>
        {showInteractiveModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInteractiveModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <TreePine size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">{t.interactiveTitle}</h2>
                </div>
                <button onClick={() => setShowInteractiveModal(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 text-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{t.wellnessGarden}</h3>
                  <p className="text-sm font-bold text-slate-400">{t.treeLevel}: {Math.floor(currentProfile.waterIntake / 500) + 1}</p>
                </div>

                <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-8xl"
                  >
                    {currentProfile.waterIntake < 500 ? '🌱' : currentProfile.waterIntake < 1500 ? '🌿' : '🌳'}
                  </motion.div>
                  <div className="absolute inset-0 border-4 border-emerald-100 rounded-full border-dashed animate-spin-slow" />
                </div>

                <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <Droplets size={16} />
                    </div>
                    <p className="text-sm font-black text-emerald-800">
                      {currentProfile.waterIntake >= 2000 
                        ? (lang === 'zh' ? '今日水分充足！樹木茁壯成長中。' : 'Hydrated! Your tree is thriving.')
                        : t.waterToGrow.replace('{amount}', (2000 - currentProfile.waterIntake).toString())}
                    </p>
                  </div>
                  <div className="h-2 w-full bg-emerald-200/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (currentProfile.waterIntake / 2000) * 100)}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                {dailyConsumed.rawCalories > nutritionTargets.calories && (
                  <div className="bg-rose-50 rounded-3xl p-6 border border-rose-100 flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-rose-800 text-sm mb-1">{lang === 'zh' ? '守護者提醒' : 'Guardian Warning'}</h4>
                      <p className="text-xs font-bold text-rose-600 leading-relaxed">{t.overeatWarning}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exercise Modal */}
      <AnimatePresence>
        {showExerciseModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExerciseModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">{t.exerciseTitle}</h2>
                </div>
                <button onClick={() => setShowExerciseModal(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-slate-50 rounded-[24px] p-2 border border-slate-100 flex items-center mb-6 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                  <span className="pl-4 text-orange-400"><Search size={18} /></span>
                  <input 
                    type="text" 
                    value={exerciseSearchQuery} 
                    onChange={(e) => setExerciseSearchQuery(e.target.value)} 
                    placeholder={t.searchExercise} 
                    className="flex-1 px-3 bg-transparent border-none outline-none text-base font-bold text-slate-600 placeholder:text-slate-300" 
                  />
                  <button 
                    onClick={handleExerciseSearch} 
                    disabled={isExerciseSearching || !exerciseSearchQuery.trim()} 
                    className="bg-orange-600 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:bg-slate-300"
                  >
                    {isExerciseSearching ? <Loader2 size={14} className="animate-spin" /> : null}
                    {isExerciseSearching ? t.aiSearching : t.aiSearchBtn}
                  </button>
                </div>

                <div className="space-y-3">
                  {exerciseResults.map((ex, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
                      <div id="basket-items" className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{ex.emoji}</span>
                          <div>
                            <h4 className="font-black text-slate-800">{ex.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ex.caloriesBurnedPer30Min} kcal / 30 {t.min}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[15, 30, 60].map(duration => (
                          <button 
                            key={duration}
                            onClick={() => addExerciseLog(ex, duration)}
                            className="py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-black hover:bg-orange-600 hover:text-white transition-all"
                          >
                            {duration}{t.min}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {currentProfile.exercises && currentProfile.exercises.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">{lang === 'zh' ? '今日運動' : 'Today\'s Exercise'}</h3>
                    <div className="space-y-2">
                      {currentProfile.exercises.map(ex => (
                        <div key={ex.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <div className="text-sm font-black text-slate-700">{ex.name}</div>
                            <div className="text-[10px] font-bold text-slate-400">{ex.duration} {t.min} · {ex.time}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-black text-orange-600">-{ex.caloriesBurned} kcal</div>
                            <button 
                              onClick={() => setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, exercises: p.exercises?.filter(e => e.id !== ex.id) } : p))}
                              className="text-rose-400 hover:text-rose-600 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAchievementsModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAchievementsModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">{t.achievements}</h2>
                </div>
                <button onClick={() => setShowAchievementsModal(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {achievements.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {achievements.map((achievement) => (
                      <motion.div 
                        key={achievement.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100"
                      >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-black text-slate-800">{achievement.title}</h3>
                          <p className="text-xs font-bold text-slate-400">{achievement.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                      <Trophy size={40} />
                    </div>
                    <p className="font-bold text-slate-400">{lang === 'zh' ? '繼續努力，解鎖更多成就！' : 'Keep going to unlock achievements!'}</p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => setShowAchievementsModal(false)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-[24px] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                >
                  {t.back}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {showPersonalModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <User size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-800">{t.personalTitle}</h2>
              </div>
              <button onClick={() => setShowPersonalModal(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-12">
              {/* Profile Summary */}
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 rounded-[32px] text-white shadow-lg shadow-indigo-100 relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-4 mb-4">
                  <div className="relative">
                    <DigitalTwin 
                      config={currentProfile.avatarConfig} 
                      size="sm" 
                    />
                    <button 
                      onClick={() => { setShowPersonalModal(false); setShowAvatarCustomizer(true); }}
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-600 border border-indigo-50"
                    >
                      <Palette size={10} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{currentProfile.name}</h3>
                    <p className="text-indigo-100 text-xs font-bold opacity-80">{currentProfile.age} {lang === 'zh' ? '歲' : 'Years'}</p>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 text-center">
                    <div className="text-[10px] font-black opacity-60 uppercase mb-1">BMI</div>
                    <div className="text-lg font-black">{nutritionTargets.bmi}</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 text-center">
                    <div className="text-[10px] font-black opacity-60 uppercase mb-1">{lang === 'zh' ? '體重' : 'Weight'}</div>
                    <div className="text-lg font-black">{currentProfile.weight}kg</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 text-center">
                    <div className="text-[10px] font-black opacity-60 uppercase mb-1">{lang === 'zh' ? '身高' : 'Height'}</div>
                    <div className="text-lg font-black">{currentProfile.height}cm</div>
                  </div>
                </div>
              </div>

              {/* Body Data Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Activity size={16} />
                    <h3 className="text-xs font-black uppercase tracking-widest">{t.bodyData}</h3>
                  </div>
                  <button onClick={() => { setShowPersonalModal(false); setCurrentPage('setup'); }} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                    {t.editProfile} <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-500">{t.activity}</span>
                    <span className="text-sm font-black text-slate-800">
                      {currentProfile.activity === 'low' ? (lang === 'zh' ? '低強度' : 'Low') : 
                       currentProfile.activity === 'medium' ? (lang === 'zh' ? '中強度' : 'Medium') : (lang === 'zh' ? '高強度' : 'High')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-500">{t.targetWeight}</span>
                    <span className="text-sm font-black text-indigo-600">{currentProfile.targetWeight} kg</span>
                  </div>
                </div>
              </div>

              {/* Creative Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">{lang === 'zh' ? '智能功能' : 'Smart Features'}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleGenerateHealthReport}
                    className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all text-left group"
                  >
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <div className="text-sm font-black text-slate-800">{t.healthReport}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1">{lang === 'zh' ? 'AI 深度分析進度' : 'AI Deep Progress Analysis'}</div>
                  </button>
                  <button 
                    onClick={() => setShowAchievementsModal(true)}
                    className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all text-left group"
                  >
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Award size={20} />
                    </div>
                    <div className="text-sm font-black text-slate-800">{t.achievements}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1">{lang === 'zh' ? '解鎖健康勳章' : 'Unlock Health Badges'}</div>
                  </button>
                  <button 
                    onClick={handleExportData}
                    className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all text-left group"
                  >
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Download size={20} />
                    </div>
                    <div className="text-sm font-black text-slate-800">{t.exportData}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1">{lang === 'zh' ? '匯出 CSV 紀錄' : 'Export CSV Logs'}</div>
                  </button>
                  <button onClick={() => { setShowPersonalModal(false); setShowChatOverlay(true); }} className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all text-left group">
                    <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Brain size={20} />
                    </div>
                    <div className="text-sm font-black text-slate-800">{t.aiNutritionMentor}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1">{lang === 'zh' ? '隨時諮詢 AI' : 'Consult AI Anytime'}</div>
                  </button>
                </div>
                <button 
                  onClick={() => setShowHealthHistory(true)}
                  className="w-full mt-3 py-4 rounded-2xl border border-slate-100 text-xs font-black text-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <History size={14} />
                  {lang === 'zh' ? '查看過往週報' : 'View Past Reports'}
                </button>
              </div>

              {/* Support & Community */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Settings size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">{lang === 'zh' ? '系統設定' : 'System Settings'}</h3>
                </div>
                <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                        <Bell size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{t.notifications}</span>
                    </div>
                    <button 
                      onClick={() => updateCurrentProfile('notificationsEnabled', !currentProfile.notificationsEnabled)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${currentProfile.notificationsEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${currentProfile.notificationsEnabled ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Support & Community */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">{t.supportSection}</h3>
                </div>
                <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                        <Mail size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{t.feedback}</span>
                    </div>
                    <a href={`mailto:${t.feedbackEmail}`} className="text-xs font-black text-indigo-600 hover:underline">
                      {t.feedbackEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Info & Disclaimer */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck size={16} />
                  <h3 className="text-xs font-black uppercase tracking-widest">{t.infoSection}</h3>
                </div>
                <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={14} className="text-slate-400" />
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{t.dataSources}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                      {t.dataSourceText}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={14} className="text-slate-400" />
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{t.disclaimer}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500 font-medium italic">
                      {t.disclaimerText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">NuBalance Pro v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Menu (Floating) */}
      <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 flex flex-col gap-3 transition-all duration-300 ${showActionMenu ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'} z-[100]`}>
        <button onClick={() => { setShowAiModal(true); setShowActionMenu(false); }} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg shadow-slate-200 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-600">{t.aiRec}</span>
          <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center"><Sparkles size={16}/></div>
        </button>
        <button onClick={() => { setShowExerciseModal(true); setShowActionMenu(false); }} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg shadow-slate-200 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-600">{t.exerciseTitle}</span>
          <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"><Zap size={16}/></div>
        </button>
        <button onClick={() => { setShowWaterMenu(true); setShowActionMenu(false); }} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg shadow-slate-200 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-600">{t.water}</span>
          <div className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center"><Droplets size={16}/></div>
        </button>
      </div>
      
      {/* Bottom Navigation Bar */}
      {currentPage === 'dashboard' && (
        <div className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-slate-100 flex justify-around items-end px-4 pb-6 pt-2 z-[90]">
            <button onClick={() => setShowProgressModal(true)} className="p-2 text-slate-300 hover:text-slate-500 flex flex-col items-center">
               <TrendingUp size={22} />
               <span className="text-[9px] font-bold mt-0.5">{t.progress}</span>
            </button>
            <button onClick={() => setShowInteractiveModal(true)} className="p-2 text-slate-300 hover:text-slate-500 flex flex-col items-center">
               <TreePine size={22} />
               <span className="text-[9px] font-bold mt-0.5">{t.interactiveTitle}</span>
            </button>

            <div className="relative">
               <button onClick={() => setShowActionMenu(!showActionMenu)} className="w-14 h-14 bg-indigo-600 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-2 active:scale-95 transition-all">
                 <Plus size={28} />
               </button>
            </div>

            <button onClick={() => setShowChatOverlay(true)} className="p-2 text-slate-300 hover:text-slate-500 flex flex-col items-center">
               <Sparkles size={22} />
               <span className="text-[9px] font-bold mt-0.5">{t.aiMentorLabel}</span>
            </button>
            <button onClick={() => setShowPersonalModal(true)} className="p-2 text-slate-300 hover:text-slate-500 flex flex-col items-center">
               <User size={22} />
               <span className="text-[9px] font-bold mt-0.5">{t.personalTitle}</span>
            </button>
        </div>
      )}

      {/* Hidden A4 Report for PDF Export */}
      <div 
        id="health-report-a4-template" 
        style={{ 
          display: 'none',
          width: '794px', // A4 width at 96dpi
          backgroundColor: 'white',
          padding: '40px',
          color: '#1e293b',
          fontFamily: 'sans-serif'
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: '2px solid #4f46e5', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#4f46e5', margin: 0 }}>NuBalance Pro</h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>AI Personalized Health Report</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', margin: 0 }}>REPORT DATE</p>
            <p style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b', margin: 0 }}>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* User Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', margin: 0 }}>User</p>
            <p style={{ fontSize: '14px', fontWeight: '900', margin: '4px 0 0 0' }}>{currentProfile.name}</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Age / Gender</p>
            <p style={{ fontSize: '14px', fontWeight: '900', margin: '4px 0 0 0' }}>{currentProfile.age} / {currentProfile.gender === 'male' ? 'M' : 'F'}</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Current Weight</p>
            <p style={{ fontSize: '14px', fontWeight: '900', margin: '4px 0 0 0' }}>{currentProfile.weight} kg</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', margin: 0 }}>Target Weight</p>
            <p style={{ fontSize: '14px', fontWeight: '900', margin: '4px 0 0 0' }}>{currentProfile.targetWeight} kg</p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '15px', color: '#1e293b' }}>Weight Trend</h3>
            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentProfile.weightHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '15px', color: '#1e293b' }}>Daily Calorie Intake</h3>
            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentProfile.logs.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Report Content */}
        <div className="markdown-body" style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <ReactMarkdown>{healthReportContent}</ReactMarkdown>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '50px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>
            Generated by NuBalance Pro AI Health Mentor. This report is for informational purposes only.
          </p>
        </div>
      </div>

      </div>
    </div>
  );
}
