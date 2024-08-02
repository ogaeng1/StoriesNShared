describe("로그인 화면", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/");
  });

  it("사용자는 이메일, 비밀번호를 이용해 로그인을 한다.", () => {
    cy.window().then((win) => {
      const isLoggedIn = !!win.localStorage.getItem("firebase:authUser");
      if (!isLoggedIn) {
        // given - 사용자가 로그인 페이지에 접근한다.
        cy.get("#login-email").as("이메일");
        cy.get("#login-password").as("비밀번호");

        // when - 사용자는 각 항목을 작성하고 로그인 버튼을 클릭한다.
        cy.get("@이메일").type("test@test.com");
        cy.get("@비밀번호").type("rk1sk2ek3");
        cy.get("#login_btn").should("exist").click();
      }

      // then - 로그인이 완료되면 메인 컨텐츠가 보여진다.
      cy.url().should("include", "http://localhost:3000/");
    });
  });
});
