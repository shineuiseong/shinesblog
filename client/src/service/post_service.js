import httpClient from './http_client'

/*
글 등록, 삭제, 수정, 조회 등  글 관련 api를 모아놓은 class입니다.
to-do
*/

class Post {
  constructor() {
    this.post = httpClient
  }

  // 글 목록 가져오기
  getList = async (query, pageNumber, checked) => {
    try {
      const params = {
        sort: query,
        offset: pageNumber,
        limit: 20,
        isClosed: checked,
      }

      const postList = await this.post.get('posts', {
        params,
      })

      return postList
    } catch (error) {
      console.log(error)
    }
  }

  //글 상세정보 조회
  getDetail = async (id) => {
    try {
      const response = await this.post.get(`posts/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  //글 추천
  getRecommendedPost = async (id) => {
    try {
      const response = await this.post.get(`posts/${id}/recommend`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }
  // 글 등록
  register = async ({ title, content }) => {
    try {
      const response = await this.post.post('posts', {
        title,
        content,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
  modify = async (id, title, content) => {
    try {
      const response = await this.post.patch(`posts/${id}`, {
        title,
        content,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  editClose = async (id, isClosed) => {
    try {
      const response = await this.post.patch(`posts/${id}`, {
        isClosed,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  deletePost = async (id) => {
    try {
      await this.post.delete(`posts/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  // 글 댓글 리스트 조회
  getComments = async (id) => {
    try {
      const response = await this.post.get(`posts/comments/${id}`)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  // 신규 댓글 등록
  registerComment = async ({ id, content }) => {
    try {
      const response = await this.post.post('posts/comments', {
        studyId: id,
        content,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  // 댓글 수정
  modifyComment = async ({ id, content }) => {
    try {
      const response = await this.post.patch(`posts/comments/${id}`, {
        content,
      })
      return response
    } catch (error) {
      return error.response.status
    }
  }

  // 댓글 삭제
  deleteComment = async ({ id }) => {
    try {
      await this.post.delete(`posts/comments/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  // 좋아요
  addLikes = async (postId) => {
    try {
      // console.log("studyId : " + studyId);
      const response = await this.post.post('posts/likes', {
        postId,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  deleteLikes = async (postId) => {
    try {
      const response = await this.post.delete(`posts/likes/${postId}`)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  getLikesUser = async (postId) => {
    try {
      const response = await this.post.get(`posts/${postId}/likes`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

const postService = new Post(httpClient)
export default postService
