import ChangeOccupationImg from "src/assets/Images/Services/Career-Change-30-1-1024x512.png";
import EmployeeListImg from "src/assets/Images/Services/EmployeeList.jpeg";
import EmployeesTransferImg from "src/assets/Images/Services/Employees Transfer.jpg";
import ContractManagerImg from "src/assets/Images/Services/contract.jpg";
import generalImg from "src/assets/Images/Services/general.jpg";
import PrivilegesImg from "src/assets/Images/Services/privligages.jpg";
import UserManagmentImg from "src/assets/Images/Services/user_managment.webp";
import VisasImg from "src/assets/Images/Services/visas(1).jpg";
import WorkPermitImg from "src/assets/Images/Services/work_permit.jpg";
export const Services = [
  {
    enName: "General",
    arName: "الخدمات العامة",
    allowedAuthorities: ["all"],
    options: [
      {
        id: "validate",
        label: {
          arLabel: "التحقق من المنشأة",
          enLabel: "check the Establishment",
        },
        active: true,
      },
      {
        id: "nitaq",
        label: { arLabel: "رد النطاق", enLabel: "Nitaq Check" },
        active: true,
      },
      {
        id: "notCountedSaudis",
        label: {
          arLabel: "السعوديين المحتسبين بأقل من 1",
          enLabel: "Less than one Saudis",
        },
        active: true,
      },
      {
        id: "calcBalance",
        label: { arLabel: "رد الرصيد", enLabel: "Get balance answer" },
        active: true,
      },
    ],
    backgroundImg: generalImg,
  },
  {
    enName: "Visas",
    arName: "خدمة التأشيرات",
    allowedAuthorities: ["VISAS"],
    value: "VISAS",
    options: [
      {
        id: "CancelVisas",
        label: {
          arLabel: "التأشيرات بإنتظار الإلغاء",
          enLabel: "Pending for cancelation Visas",
        },
        active: true,
      },
      {
        id: "visaCheckAllCases",
        label: {
          arLabel: "التحقق من التأشيرات",
          enLabel: "Check Visas and Bordernumber",
        },
        active: true,
      },
      {
        id: "issuingIssues",
        label: {
          arLabel: "التحقق من مشاكل في الإصدار",
          enLabel: "Check Issuing Issues",
        },
        active: true,
      },
      {
        id: "allowanceEnds",
        label: {
          arLabel: "تحول المنشأة لتوسع",
          enLabel: "Transformed to Expansion (Allownce EndDate)",
        },
        active: true,
      },
    ],
    backgroundImg: VisasImg,
  },
  {
    enName: "Employee List",
    arName: "قائمة الموظفين",
    value: "EMP_LIST",
    allowedAuthorities: ["SUPER_VISOR"],
    options: [
      {
        id: "updateLaborer",
        label: {
          arLabel: "التحقق وتحديث بيانات الموظف",
          enLabel: "Check and update Laborer information",
        },
        active: true,
      },
      {
        id: "changeActivity",
        label: {
          arLabel: "التحقق من تغير نشاط المنشأة",
          enLabel: "Check establishment change activity",
        },
        active: true,
      },
    ],
    backgroundImg: EmployeeListImg,
  },
  {
    enName: "Work Permit",
    arName: "رخص العمل",
    allowedAuthorities: ["WP_ROLE"],
    value: "WORK_PERMIT",
    options: [
      {
        id: "financialExemption",
        label: {
          arLabel: "الإعفاء المالي",
          enLabel: "Check Financial Exemption",
        },
        active: true,
      },
      {
        id: "indebtednessDetails",
        label: { arLabel: "المديونية", enLabel: "Indebtedness Details" },
        active: true,
      },
      {
        id: "paymentNumbers",
        label: { arLabel: "أرقام السداد", enLabel: "payment Numbers" },
        active: true,
      },
      {
        id: "wpDetails",
        label: { arLabel: "تفاصيل الرخصة'", enLabel: "Work Permit Details" },
        active: true,
      },
    ],
    backgroundImg: WorkPermitImg,
  },
  {
    enName: "Contract Manager",
    arName: "خدمة عقود العمل",
    allowedAuthorities: ["CM_ROLE"],
    value: "CONTRACT_MANAG",
    options: [
      {
        id: "AbsentFromWork",
        label: {
          arLabel: "طلبات إنقطاع عن العمل",
          enLabel: "Absent From Work",
        },
        active: true,
      },
      {
        id: "ContractDetails",
        label: {
          arLabel: "التحقق من تفاصيل العقد للموظف",
          enLabel: "Contract Details",
        },
        active: true,
      },
      {
        id: "TerminateContract",
        label: {
          arLabel: "طلب إنهاء العلاقة التعاقدية",
          enLabel: "Terminate Contract",
        },
        active: true,
      },
      {
        id: "ContractAuthenticationIndicator",
        label: {
          arLabel: "التحقق من نسبة توثيق العقود",
          enLabel: "Contract Authentication Indicator",
        },
        active: true,
      },
    ],
    backgroundImg: ContractManagerImg,
  },
  {
    enName: "User Managment",
    arName: "خدمة ادارة المستخدمين",
    allowedAuthorities: ["UM_ROLE"],
    value: "USER_MANAG",
    options: [
      {
        id: "notAppearEsts",
        label: {
          arLabel: "المنشأة لا تظهر",
          enLabel: "not Appear Establishments",
        },
        active: true,
      },
      {
        id: "CheckPaymentRef",
        label: {
          arLabel: "التحقق من دفع الأشتراك",
          enLabel: "Check Payment Referance",
        },
        active: true,
      },
    ],
    backgroundImg: UserManagmentImg,
  },
  {
    enName: "Privileges",
    arName: "خدمة ادارة الصلاحيات",
    allowedAuthorities: ["PM_ROLE"],
    value: "PRIVILIAGE_MANAG",
    options: [
      {
        id: "checkPrivileges",
        label: { arLabel: "االتحقق من الصلاحيات", enLabel: "Check Privileges" },
        active: true,
      },
    ],
    backgroundImg: PrivilegesImg,
  },
  {
    enName: "Employees Transfer",
    arName: "نقل الخدمات",
    allowedAuthorities: ["ET_ROLE"],
    value: "EMP_TRANSFER",
    options: [
      {
        id: "CheckETRequest",
        label: {
          arLabel: "التحقق من تفاصيل طلب النقل",
          enLabel: "Check Employee Transfeer Request",
        },
        active: true,
      },
      {
        id: "CheckEstNatPercentage",
        label: {
          arLabel: "التحقق من نسب الجنسيات لنقل",
          enLabel: "Establishment nationalities percentage",
        },
        active: true,
      },
      {
        id: "TBetweenBranches",
        label: {
          arLabel: "النقل بين الفروع",
          enLabel: "Transfeer between branches",
        },
        active: true,
      },
    ],
    backgroundImg: EmployeesTransferImg,
  },
  {
    enName: "Change Occupation",
    arName: "خدمة تغيير المهن",
    allowedAuthorities: ["CO_ROLE"],
    value: "CHANGE_OCUP",
    options: [
      {
        id: "CheckCORequest",
        label: {
          arLabel: "التحقق من طلب تغير المهنة",
          enLabel: "Check Change Occupation Request",
        },
        active: true,
      },
      {
        id: "CheckSaudiCertificate",
        label: {
          arLabel: "التحقق من اصدار شهادة السعودة",
          enLabel: "Check Saudi Certificate",
        },
        active: true,
      },
      {
        id: "CheckNameofSaudiCertificate",
        label: {
          arLabel: "التحقق من شهادة السعودة",
          enLabel: "Check Name of Saudi Certificate",
        },
        active: true,
      },
      {
        id: "OccupationCorrection",
        label: {
          arLabel: "التحقق من طلب تصحيح المهنة",
          enLabel: "Occupation Correction",
        },
        active: true,
      },
    ],
    backgroundImg: ChangeOccupationImg,
  },
];
//E_ADVISOR
