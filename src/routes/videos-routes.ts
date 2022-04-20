import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
  const videos = videosRepository.getVideos()
  res.send(videos)
})

  .post('/', (req: Request, res: Response) => {
    try {
      const title = req.body.title;
      const createVideo = videosRepository.createVideo(title);
      if (createVideo.data && createVideo) {
        res.status(201);
        res.send(createVideo.data);
      } else {
        res.status(400)
        const errorsMessages = createVideo.errorsMessages
        const resultCode = createVideo.resultCode
        res.send({errorsMessages, resultCode})
      }
    } catch (error) {
      return res.sendStatus(500)
    }
  })

  .put('/:videoId', (req: Request, res: Response) => {
    try {
      const id = +req.params.videoId;
      const title = req.body.title;
      let updateVideo = videosRepository.updateVideoById(id, title)

      if (updateVideo.resultCode === 0 && updateVideo) {
        res.status(204);
        res.send();
      } else {
        if (updateVideo.errorsMessages.find(i => i.field === "id")) {
          res.status(404)
          res.send({
            id: {"errors": updateVideo.errorsMessages[0]}
          })
        } else {
          res.status(400)
          res.send({
            errorsMessages: updateVideo.errorsMessages,
            resultCode: updateVideo.resultCode
          })
        }
      }
    } catch (error) {
      return res.sendStatus(500)
    }
  })

  .get('/:videoId', (req: Request, res: Response) => {
    try {
      const id = +req.params.videoId;
      const video = videosRepository.getVideoById(id)

      if (video.errorsMessages.length === 0) {
        res.status(200);
        res.send(video.data);
      } else {
        res.status(404)
        res.send();
      }
    } catch (error) {
      res.sendStatus(500)
    }
  })

  .delete('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const isDeleted = videosRepository.deleteVideoById(id)

    if (isDeleted) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  })