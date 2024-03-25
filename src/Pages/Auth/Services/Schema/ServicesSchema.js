import generalImg from 'src/Core/Images/Services/General.jpg'
import VisasImg from 'src/Core/Images/Services/visas(1).jpg'
import EmployeeListImg from 'src/Core/Images/Services/EmployeeList.jpeg'
import WorkPermitImg from 'src/Core/Images/Services/work-permit.jpg'
import ContractManagerImg from 'src/Core/Images/Services/ContractPicture.jpg'
import UserManagmentImg from 'src/Core/Images/Services/User Managment.jpg'
import PrivilegesImg from 'src/Core/Images/Services/Privileges.jpg'
import EmployeesTransferImg from 'src/Core/Images/Services/Employees Transfer.jpg'
import ChangeOccupationImg from 'src/Core/Images/Services/Privileges(1).jpg'
export const Services = {
  General: {
    enName: "General",
    arName: "الخدمات العامة",
    options: [
      { id: "validate", label: { arLabel: "التحقق من المنشأة", enLabel: "check the Establishment" }, active: true },
      { id: "nitaq", label: { arLabel: "رد النطاق", enLabel: "Nitaq Check" }, active: true },
      { id: "notCountedSaudis", label: { arLabel: "السعوديين المحتسبين بأقل من 1", enLabel: "Less than one Saudis" }, active: true },
      { id: "calcBalance", label: { arLabel: "رد الرصيد", enLabel: "Get balance answer" }, active: true }
    ],
    backgroundImg: generalImg

  },
  Visas: {
    enName: "Visas",
    arName: "خدمة التأشيرات",
    options: [
      { id: "CancelVisas", label: { arLabel: "التأشيرات بإنتظار الإلغاء", enLabel: "Pending for cancelation Visas" }, active: true },
      { id: "visaCheckAllCases", label: { arLabel: "التحقق من التأشيرات", enLabel: "Check Visas and Bordernumber" }, active: true },
      { id: "issuingIssues", label: { arLabel: "التحقق من مشاكل في الإصدار", enLabel: "Check Issuing Issues" }, active: true },
      { id: "allowanceEnds", label: { arLabel: "تحول المنشأة لتوسع", enLabel: "Transformed to Expansion (Allownce EndDate)" }, active: true }
    ],
    backgroundImg: VisasImg

  },
  EmpList: {
    enName: "Employee List",
    arName: "قائمة الموظفين",
    options: [
      { id: "updateLaborer", label: { arLabel: "التحقق وتحديث بيانات الموظف", enLabel: "Check and update Laborer information" }, active: true },
      { id: "changeActivity", label: { arLabel: "التحقق من تغير نشاط المنشأة", enLabel: "Check establishment change activity" }, active: true },
    ],
    backgroundImg: EmployeeListImg
  },
  WP: {
    enName: "Work Permit",
    arName: "رخص العمل",
    options: [
      { id: "financialExemption", label: { arLabel: "الإعفاء المالي", enLabel: "Check Financial Exemption" }, active: true },
      { id: "indebtednessDetails", label: { arLabel: "المديونية", enLabel: "Indebtedness Details" }, active: true },
      { id: "paymentNumbers", label: { arLabel: "أرقام السداد", enLabel: "payment Numbers" }, active: true },
      { id: "wpDetails", label: { arLabel: "تفاصيل الرخصة'", enLabel: "Work Permit Details" }, active: true },
    ],
    backgroundImg: WorkPermitImg
  },
  CM: {
    enName: "Contract Manager",
    arName: "خدمة عقود العمل",
    options: [
      { id: "AbsentFromWork", label: { arLabel: "طلبات إنقطاع عن العمل", enLabel: "Absent From Work" }, active: true },
      { id: "ContractDetails", label: { arLabel: "التحقق من تفاصيل العقد للموظف", enLabel: "Contract Details" }, active: true },
      { id: "TerminateContract", label: { arLabel: "طلب إنهاء العلاقة التعاقدية", enLabel: "Terminate Contract" }, active: true },
      { id: "ContractAuthenticationIndicator", label: { arLabel: "التحقق من نسبة توثيق العقود", enLabel: "Contract Authentication Indicator" }, active: true },
    ],
    backgroundImg: ContractManagerImg
  },
  UM: {
    enName: "User Managment",
    arName: "خدمة ادارة المستخدمين",
    options: [
      { id: "notAppearEsts", label: { arLabel: "المنشأة لا تظهر", enLabel: "not Appear Establishments" }, active: true },
      { id: "CheckPaymentRef", label: { arLabel: "التحقق من دفع الأشتراك", enLabel: "Check Payment Referance" }, active: true },
    ],
    backgroundImg: UserManagmentImg
  },
  PM: {
    enName: "Privileges",
    arName: "خدمة ادارة الصلاحيات",
    options: [
      { id: "checkPrivileges", label: { arLabel: "االتحقق من الصلاحيات", enLabel: "Check Privileges" }, active: true },

    ],
    backgroundImg: PrivilegesImg
  },
  ET: {
    enName: "Employees Transfer",
    arName: "نقل الخدمات",
    options: [
      { id: "CheckETRequest", label: { arLabel: "التحقق من تفاصيل طلب النقل", enLabel: "Check Employee Transfeer Request" }, active: true },
      { id: "CheckEstNatPercentage", label: { arLabel: "التحقق من نسب الجنسيات لنقل", enLabel: "Establishment nationalities percentage" }, active: true },
      { id: "TBetweenBranches", label: { arLabel: "النقل بين الفروع", enLabel: "Transfeer between branches" }, active: true },
    ],
    backgroundImg: EmployeesTransferImg
  },
  CO: {
    enName: "Change Occupation",
    arName: "خدمة تغيير المهن",
    options: [
      { id: "CheckCORequest", label: { arLabel: "التحقق من طلب تغير المهنة", enLabel: "Check Change Occupation Request" }, active: true },
      { id: "CheckSaudiCertificate", label: { arLabel: "التحقق من اصدار شهادة السعودة", enLabel: "Check Saudi Certificate" }, active: true },
      { id: "CheckNameofSaudiCertificate", label: { arLabel: "التحقق من شهادة السعودة", enLabel: "Check Name of Saudi Certificate" }, active: true },
      { id: "OccupationCorrection", label: { arLabel: "التحقق من طلب تصحيح المهنة", enLabel: "Occupation Correction" }, active: true },
    ],
    backgroundImg: ChangeOccupationImg
  }
}