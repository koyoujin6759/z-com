import style from "@/app/(beforeLogin)/_component/signup.module.css";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import { redirect } from "next/navigation";
import Form from "next/form";

export default function SignupModal() {
  const submit = async (formData: FormData): Promise<void> => {
    "use server";
    if (!formData.get("id")) {
      throw new Error("no_id");
    }
    if (!formData.get("name")) {
      throw new Error("no_name");
    }
    if (!formData.get("password")) {
      throw new Error("no_password");
    }
    if (!formData.get("image")) {
      throw new Error("no_image");
    }

    const shouldRedirect = false;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "post",
        body: formData,
        credentials: "include",
      });

      console.log(response.status);
      if (response.status === 403) {
        throw new Error("user_exists");
      }
      console.log(await response.json());
    } catch (err) {
      console.error(err);
      throw err;
    }
    if (shouldRedirect) {
      redirect("/home");
    }
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <Form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input id="id" className={style.input} type="text" placeholder="" required name="id" />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input id="name" className={style.input} type="text" placeholder="" required name="name" />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input id="password" className={style.input} type="password" placeholder="" required name="password" />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input id="image" className={style.input} type="file" accept="image/*" required name="image" />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton}>
                가입하기
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
