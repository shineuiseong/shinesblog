import sanitizeHtml from 'sanitize-html'

export class PostService {
  constructor({ postModel, userModel, notificationModel }) {
    this.postModel = postModel
    this.userModel = userModel
    this.notificationModel = notificationModel
  }

  // 메인 화면에서 게시글 리스트를 조회
  async findPost(offset, limit, sort, language, period, isClosed) {
    const posties = await this.postModel.findPost(offset, limit, sort, language, period, isClosed)
    const sortPosties = this.sortLanguageByQueryParam(posties, language)
    return sortPosties
  }

  async sortLanguageByQueryParam(posties, language) {
    if (typeof language == 'undefined') return studies

    // const paramLanguage = language.split(',');
    // for (let i = 0 ; i < studies.length; i++) {
    //     studies[i].language.sort(function(a, b) {
    //         if(paramLanguage.indexOf(b) != -1) return 1;
    //         else  return -1;
    //     })
    // }
    // return studies;
  }

  // 신규 게시글 등록
  async registerPost(userID, post) {
    post.author = userID
    if (post.content) {
      let cleanHTML = sanitizeHtml(post.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      })
      post.content.cleanHTML
    }
    const postRecord = await this.postModel.create(post)
    return postRecord
  }

  // 게시글 정보를 수정
  async modifyPost(id, tokenUser, post) {
    await this.postModel.checkPostAuthorization(id, tokenUser) //접근권한 체크
    if (post.content) {
      let cleanHTML = sanitizeHtml(post.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      })
      post.content = cleanHTML
    }
    const postRecord = await this.postModel.modifyPost(id, post)
    return postRecord
  }

  // 게시글 삭제
  async deletePost(id, tokenUser) {
    await this.postModel.checkPostAuthorization(id, tokenUser) //접근권한 체크
    await this.postModel.deletePost(id)
    await this.notificationModel.deleteNotificationByPost(id) //알람제거
  }
}
