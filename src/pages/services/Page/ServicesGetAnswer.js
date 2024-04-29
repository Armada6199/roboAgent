import { FormGroup } from "@material-ui/core";
import { styled } from "@mui/material";
import { Services } from "../Schema/ServicesSchema";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import i18next from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormStyle, { TopPaneStyle } from "src/styles/styles";
import { numbersOnly } from "src/utils/DefualtValidators";
import AxiosHit from "src/utils/api/AxiosHit";
import TasksItem from "src/pages/Dashboard/TasksItem";

const FormGroupStyle = styled(FormGroup)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));

const ServicesGetAnswer = () => {
  // const [t] = useTranslation("common");
  const currService = Services[localStorage.getItem("Service")];
  // const [answer, setAnswer] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(-1);
  console.log(answerIndex);
  const [generalAnswerS, setGeneralAnswerS] = useState([
    `رقم المنشأة : 1-  2718720  \n للمنشآت ذات الحجم الصغير فئة ( أ ) يكون الرصيد 6 ( مخصوم منه عدد الموظفين الإجمالي ( عدد السعوديين + عدد الأجانب ) و عدد التأشيرات المصدرة الغير مستخدمة أو طلبات النقل تحت الاجراء إن وجدت ) مع اشتراط وجود موظف سعودي واحد على الأقل أو تسجيل المالك على المنشأة. عند وصول مجموع الموظفين على رأس العمل الى 6 يصبح نطاق و رصيد المنشأة حسب نسبة التوطين حيث أن المنشأة في هذه الحالة لا تصبح مصنفة كمنشأة ( صغير فئة أ ) . ولديك : - عدد 1 موظفين (عدد السعوديين و الأجانب) على مستوى الكيان ورصيد الإستقطاب : 5 نطاق المنشأة : معلومات المنشأة كالتالي: نوع المنشأة : توسع نطاق المنشأة :"اخضر صغير (فئة أ)" حجم المنشأة : صغير فئة (أ) إجمالي عدد الموظفين (السعوديين والأجانب) : 1 مع التنويه بأن نطاق المنشآت بحجم صغير فئة (أ) كالتالي : أخضر صغير و أحمر صغير و بعد وصول منشأتك إلى عدد موظفين 6 فأكثر سيصبح الرصيد بحسب نسبة التوطين مع احتساب النطاقات بحسب نسبة التوطين ( أحمر ، أخضر منخفض ،  أخضر متوسط ،  أخضر مرتفع ،  بلات`,
    ,
    `يرجى المحاولة مرة أخرى وتزويدنا بصورة واضحة في حال إستمرار الإشكالية أو في حال ظهور أية مشاكل أخرى`,
    ,
  ]);
  const [wpAnswers, setWbAnswerS] = useState([
    `رقم المنشأة : 1-1698161
   \n
    من شروط الحصول على الاعفاء، أن يكون المالك مسجل في التامينات كمتفرغ وهذه المنشأة لا تحقق هذا الشرط، ونفيدكم بأنه قد يكون المالك مسجل في المنشأة في التامينات ولكن لم يتم احتسابه في الوزارة وذلك لعدة اسباب منها:
     
    - أن يكون المالك مسجل كمالك ولكن غير متفرغ.
    - أو يكون مسجل كموظف وليس المالك في المنشأة.
    - أو يكون المالك مسجل ومتفرغ ولكن يوجد منشاءات فرديه مسجلة بإسمه لم يتم اغلاقها.
     
    يمكنكم التحقق من سبب عدم احتساب المالك كمتفرغ من خلال المؤسسة العامة للتأمينات الاجتماعية.
     
    في حال كان إستفساركم عن الإعفاء الصناعي :
     
    المنشأة رقم (1-1698161) غير مسجلة كمنشأة صناعية، يرجى مراجعة وزارة الصناعة لتسجيل المنشأة وتفعيل الاعفاء.`,
  ]);
  const [loading, setLoading] = useState();
  const [options, setOptions] = useState(() => {
    const options = {};
    currService.options.map((o) => (options[o["id"]] = false));
    return options;
  });
  console.log("currService ===> ", currService);

  // form submit
  const onSubmit = async (values) => {
    setLoading(true);
    values["options"] = Object.keys(options).map((key) => options[key]);
    console.table(values);
    console.log("values == ", values);
    // alert(JSON.stringify(values));
    let establishmentNumber = values.establishment_number;
    establishmentNumber += values.id_number != "" ? "-" + values.id_number : "";
    console.log("establishmentNumber ===> ", establishmentNumber);
    let hitResult = await AxiosHit({
      method: "post",
      url: "get-answer",
      data: {
        establishmentNumber: establishmentNumber,
        optionCode: values.options,
        reason: values.reason,
        serviceCode: localStorage.getItem("Service"),
      },
      baseURL: "http://localhost:3001/",
    });
    console.log("hitResult ===> ", hitResult);
    console.log("hitResult ===> ", hitResult.data?.Answer);
    // setAnswer(hitResult.data?.Answer);
    setLoading(false);
    // HandelRegularHit(hitResult, setAlertInfo, loginUpdate, values)
  };
  const handelCheckValue = (id, status) => {
    options[id] = status;
  };
  // hook form
  const {
    register,
    handleSubmit,
    Trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      establishment_number: "",
      id_number: "",
      check_options: "",
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "grid",
        }}
        gridColumn="span 9"
      >
        <TopPaneStyle
          item="true"
          textAlign="center"
          alignContent="center"
          width="100%"
          padding={1}
        >
          <Typography margin={2} variant="h3" style={{ fontWeight: "bold" }}>
            {i18next.language === "English"
              ? currService.enName
              : currService.arName}
          </Typography>
        </TopPaneStyle>
      </Box>
      <Container className="form_Container" maxWidth="lg">
        <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-multiline-static"
            label="Reason"
            width="50%"
            {...register("reason", {
              onChange: (e) =>
                numbersOnly(e, {
                  type: "IDNo",
                  maxNumber: 10,
                  replaceWith: "",
                }),
              onPaste: (e) =>
                numbersOnly(e, {
                  type: "IDNo",
                  maxNumber: 10,
                  replaceWith: "",
                }),
            })}
            disabled={loading}
          />
          <Box
            sx={{
              display: "grid",
              gap: { xs: 3, sm: 1 },
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Establishment Number"
              width="100%"
              pattern="[0-9]*"
              {...register("establishment_number", {
                onChange: (e) => numbersOnly(e),
                onPaste: (e) => numbersOnly(e),
                require: true,
              })}
              disabled={loading}
              error={errors.email ? true : false}
              helperText={errors.email && "Enter a valid email address"}
            />

            <TextField
              id="outlined-multiline-static"
              label="ID or Iqameh"
              width="100%"
              {...register("id_number", {
                onChange: (e) =>
                  numbersOnly(e, {
                    type: "IDNo",
                    maxNumber: 10,
                    replaceWith: "",
                  }),
                onPaste: (e) =>
                  numbersOnly(e, {
                    type: "IDNo",
                    maxNumber: 10,
                    replaceWith: "",
                  }),
              })}
              disabled={loading}
            />
          </Box>
          <Container
            className="form_Container"
            maxWidth="lg"
            sx={{
              display: "grid",
              gap: { xs: 3, sm: 1 },
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            {currService.options.map((el) => (
              <TasksItem
                key={el.id}
                id={el.id}
                status={!el.active}
                label={
                  i18next.language === "English"
                    ? el.label.enLabel
                    : el.label.arLabel
                }
                mission={false}
                checkOptions={handelCheckValue}
              />
            ))}
          </Container>
          <TextField
            variant="outlined"
            readOnly
            id="outlined-multiline-static"
            // label="Answer"
            textAlign="right"
            style={{ direction: "rtl" }}
            value={
              localStorage.getItem("Service") == "General"
                ? generalAnswerS[answerIndex]
                : wpAnswers[answerIndex]
            }
            InputProps={{
              readOnly: true,
            }}
            // disabled
            helperText="Answer"
            multiline
            rows={10}
            width="100%"
          />
          <Container
            className="form_Container"
            maxWidth="lg"
            sx={{
              display: "grid",
              gap: { xs: 3, sm: 1 },
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <Button
              variant="contained"
              color="success"
              style={{ width: "100%" }}
              // type="submit"
              isLoading={loading}
              disableElevation
              onClick={() => {
                setTimeout(() => {
                  setAnswerIndex((prev) => prev + 1);
                }, 500);
              }}
            >
              Search
            </Button>

            <Button
              variant="contained"
              color="error"
              style={{ width: "100%", color: "white", backgroundColor: "Red" }}
              width="45%"
              href="/dash/services"
            >
              back
            </Button>
          </Container>
        </FormStyle>
      </Container>
    </>
  );
};

export default ServicesGetAnswer;
