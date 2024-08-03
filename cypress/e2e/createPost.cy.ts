describe("로그인 후, 게시글을 생성한다.", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/");
  });

  it("사용자는 이메일, 비밀번호를 이용해 로그인을 하고, 게시글을 생성한다.", () => {
    cy.window().then((win) => {
      const isLoggedIn = !!win.localStorage.getItem("firebase:authUser");
      if (!isLoggedIn) {
        // given - 사용자가 로그인 페이지에 접근한다.
        cy.get("#login-email").as("이메일");
        cy.get("#login-password").as("비밀번호");

        // when - 사용자는 각 항목을 작성하고 로그인 후, 게시글 작성 버튼을 클릭하고 게시글을 작성한다.
        cy.get("@이메일").type("test@test.com");
        cy.get("@비밀번호").type("rk1sk2ek3");
        cy.get("#login_btn").should("exist").click();
        cy.wait(3000);

        cy.get("#create-post").click();
        cy.get("#input-content").as("게시글내용");
        cy.get("@게시글내용").type("이것은 테스트 게시글입니다.");
        cy.get("#done-post-btn").click();
      }

      // then - 게시글 작성이 완료되면 모달이 닫히고, 작성한 게시글이 리스트에 등록된다.
      cy.contains("이것은 테스트 게시글입니다.");
    });
  });
});
