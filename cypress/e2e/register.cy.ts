import "cypress-file-upload";

describe("회원가입 화면", () => {
  it("사용자는 프로필사진, 이메일, 비밀번호, 닉네임, 자기소개를 작성하고 회원가입을 한다.", () => {
    // given - 사용자가 회원가입 페이지에 접근한다.
    cy.visit("/signup");

    cy.get("#profile-img").as("프로필 사진");
    cy.get("#input-email").as("이메일");
    cy.get("#input-password").as("비밀번호");
    cy.get("#input-nickname").as("닉네임");
    cy.get("#input-bio").as("자기소개");

    const uniqueId = new Date();
    const unique = uniqueId.getSeconds();
    const uniqueEmail = `user${unique}@test.com`;
    const uniqueNickname = `테스트닉네임${unique}`;

    // when - 사용자는 각 항목을 작성하고 회원가입 버튼을 클릭한다.
    cy.fixture("고양이.jfif", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("#profile-img").attachFile(
          {
            fileContent,
            fileName: "고양이.jfif",
            mimeType: "image/jfif",
          },
          {
            subjectType: "input",
          }
        );
      });
    cy.get("@이메일").type(uniqueEmail);
    cy.get("@비밀번호").type("rk1sk2ek3");
    cy.get("@닉네임").type(uniqueNickname);
    cy.get("@자기소개").type("안녕하세요");

    cy.get("#signup-btn").should("exist").click();

    // then - 회원가입이 완료되면 메인 페이지가 보여진다.
    cy.url().should("include", "http://localhost:3000/");
  });
});
