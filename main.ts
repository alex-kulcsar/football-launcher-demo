controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    info.changeScoreBy(-1)
    launcher.launchFootball(1)
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    info.player2.changeScoreBy(-1)
    launcher.launchFootball(2)
})
sprites.onOverlap(SpriteKind.P2Football, SpriteKind.Target, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.player2.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    launcher.increaseTargetSpeed(otherSprite)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    launcher.increaseAngle(1)
})
sprites.onOverlap(SpriteKind.P1Football, SpriteKind.Target, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    launcher.increaseTargetSpeed(otherSprite)
})
info.onCountdownEnd(function () {
    if (launcher.currentRound() < launcher.numRounds()) {
        launcher.startNewRound()
        game.splash("Round " + launcher.currentRound() + "!")
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
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    info.player4.changeScoreBy(-1)
    launcher.launchFootball(4)
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    launcher.decreaseAngle(2)
})
sprites.onOverlap(SpriteKind.P3Football, SpriteKind.Target, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.player3.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    launcher.increaseTargetSpeed(otherSprite)
})
sprites.onOverlap(SpriteKind.P4Football, SpriteKind.Target, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.player4.changeScoreBy(3)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    launcher.increaseTargetSpeed(otherSprite)
})
controller.player4.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    launcher.decreaseAngle(4)
})
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    info.player3.changeScoreBy(-1)
    launcher.launchFootball(3)
})
controller.player4.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    launcher.increaseAngle(4)
})
controller.player3.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    launcher.increaseAngle(3)
})
game.showLongText("Use left and right to change your angle.\\n \\nPress A to launch a football.\\n \\nHow many times can you hit the target?", DialogLayout.Full)
scene.setBackgroundColor(7)
let p1Launcher = sprites.create(assets.image`p1_7`, SpriteKind.Player)
p1Launcher.setPosition(10, 20)
launcher.setPlayerSprite(p1Launcher, 1)
launcher.setMarkerColor(1, 2)
let p2Launcher = sprites.create(assets.image`p2_0`, SpriteKind.Player)
p2Launcher.setPosition(150, 20)
launcher.setPlayerSprite(p2Launcher, 2)
launcher.setMarkerColor(2, 8)
let p3Launcher = sprites.create(assets.image`p3_0`, SpriteKind.Player)
p3Launcher.setPosition(10, 100)
launcher.setPlayerSprite(p3Launcher, 3)
launcher.setMarkerColor(3, 4)
let p4Launcher = sprites.create(assets.image`p4_0`, SpriteKind.Player)
p4Launcher.setPosition(150, 100)
launcher.setPlayerSprite(p4Launcher, 4)
launcher.setMarkerColor(4, 6)
let targetSprite = sprites.create(assets.image`target`, SpriteKind.Target)
launcher.addTarget(targetSprite)
launcher.addRound(50, 0)
launcher.addRound(0, 50)
launcher.addRound(50, 50)
info.setScore(0)
info.player2.setScore(0)
info.player3.setScore(0)
info.player4.setScore(0)
launcher.startNewRound()
game.splash("Round " + launcher.currentRound() + "!")
