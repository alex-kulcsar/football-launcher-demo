namespace SpriteKind {
    export const FB1 = SpriteKind.create()
    export const FB2 = SpriteKind.create()
    export const FB3 = SpriteKind.create()
    export const FB4 = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.FB4, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.player4.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    if (targetSprite.vx < 0) {
        targetSprite.vx += -10
    } else if (targetSprite.vx > 0) {
        targetSprite.vx += 10
    }
    if (targetSprite.vy < 0) {
        targetSprite.vy += -10
    } else if (targetSprite.vy > 0) {
        targetSprite.vy += 10
    }
})
sprites.onOverlap(SpriteKind.FB1, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    if (targetSprite.vx < 0) {
        targetSprite.vx += -10
    } else if (targetSprite.vx > 0) {
        targetSprite.vx += 10
    }
    if (targetSprite.vy < 0) {
        targetSprite.vy += -10
    } else if (targetSprite.vy > 0) {
        targetSprite.vy += 10
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    launcher.launchFootball(1)
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    launcher.launchFootball(2)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    launcher.increaseAngle(1)
})
info.onCountdownEnd(function () {
    if (round < fbVxValues.length - 1) {
        round += 1
        game.splash("Round " + (round + 1) + "!")
        sprites.destroyAllSpritesOfKind(SpriteKind.FB1)
        sprites.destroyAllSpritesOfKind(SpriteKind.FB2)
        sprites.destroyAllSpritesOfKind(SpriteKind.FB3)
        sprites.destroyAllSpritesOfKind(SpriteKind.FB4)
        targetSprite.setPosition(80, 60)
        targetSprite.setVelocity(fbVxValues[round], fbVyValues[round])
        info.startCountdown(30)
    } else {
        game.gameOver(true)
    }
})
controller.player3.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    launcher.decreaseAngle(3)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    launcher.decreaseAngle(1)
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    launcher.increaseAngle(2)
})
sprites.onOverlap(SpriteKind.FB2, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.player2.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    if (targetSprite.vx < 0) {
        targetSprite.vx += -10
    } else if (targetSprite.vx > 0) {
        targetSprite.vx += 10
    }
    if (targetSprite.vy < 0) {
        targetSprite.vy += -10
    } else if (targetSprite.vy > 0) {
        targetSprite.vy += 10
    }
})
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    launcher.launchFootball(4)
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    launcher.decreaseAngle(2)
})
controller.player4.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    launcher.decreaseAngle(4)
})
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    launcher.launchFootball(3)
})
sprites.onOverlap(SpriteKind.FB3, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.player3.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    if (targetSprite.vx < 0) {
        targetSprite.vx += -10
    } else if (targetSprite.vx > 0) {
        targetSprite.vx += 10
    }
    if (targetSprite.vy < 0) {
        targetSprite.vy += -10
    } else if (targetSprite.vy > 0) {
        targetSprite.vy += 10
    }
})
controller.player4.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    launcher.increaseAngle(4)
})
controller.player3.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    launcher.increaseAngle(3)
})
let fbVyValues: number[] = []
let fbVxValues: number[] = []
let round = 0
let targetSprite: Sprite = null
game.showLongText("Use left and right to change your angle.\\n \\nPress A to launch a football.\\n \\nHow many times can you hit the target?", DialogLayout.Full)
scene.setBackgroundColor(7)
let p1Launcher = sprites.create(assets.image`p1_7`, SpriteKind.Player)
p1Launcher.setPosition(10, 20)
launcher.setPlayerSprite(p1Launcher, 1)
let p2Launcher = sprites.create(assets.image`p2_0`, SpriteKind.Player)
p2Launcher.setPosition(150, 20)
launcher.setPlayerSprite(p2Launcher, 2)
let p3Launcher = sprites.create(assets.image`p3_0`, SpriteKind.Player)
p3Launcher.setPosition(10, 100)
launcher.setPlayerSprite(p3Launcher, 3)
let p4Launcher = sprites.create(assets.image`p4_0`, SpriteKind.Player)
p4Launcher.setPosition(150, 100)
launcher.setPlayerSprite(p4Launcher, 4)
targetSprite = sprites.create(assets.image`target`, SpriteKind.Enemy)
targetSprite.setBounceOnWall(true)
let PI = Math.atan2(0, -1)
info.setScore(0)
info.player2.setScore(0)
info.player3.setScore(0)
info.player4.setScore(0)
round = 0
fbVxValues = [50, 0, 50]
fbVyValues = [0, 50, 50]
targetSprite.setVelocity(fbVxValues[round], fbVyValues[round])
game.splash("Round " + (round + 1) + "!")
info.startCountdown(30)
