namespace SpriteKind {
    export const FB1 = SpriteKind.create()
    export const FB2 = SpriteKind.create()
    export const FB3 = SpriteKind.create()
    export const FB4 = SpriteKind.create()
}
function updateP3 () {
    p3Launcher.setImage(p3LauncherImages[p3Direction])
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
    launchP1()
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    launchP2()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (p1Direction < p1LauncherImages.length - 1) {
        p1Direction += 1
    }
    updateP1()
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
    if (p3Direction > 0) {
        p3Direction += -1
    }
    updateP3()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (p1Direction > 0) {
        p1Direction += -1
    }
    updateP1()
})
function updateP4 () {
    p4Launcher.setImage(p4LauncherImages[p4Direction])
}
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (p2Direction < p2LauncherImages.length - 1) {
        p2Direction += 1
    }
    updateP2()
})
function launchP2 () {
    p2vx = Math.cos(PI * p2Direction / 16)
    p2vy = Math.sin(PI * p2Direction / 16)
    projectile = sprites.createProjectileFromSprite(assets.image`fb`, p2Launcher, (0 - p2vx) * fbSpeed, p2vy * fbSpeed)
    projectile.setKind(SpriteKind.FB2)
    info.player2.changeScoreBy(-1)
}
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
function launchP4 () {
    p4vx = Math.cos(PI * p4Direction / 16)
    p4vy = Math.sin(PI * p4Direction / 16)
    projectile = sprites.createProjectileFromSprite(assets.image`fb`, p4Launcher, (0 - p4vx) * fbSpeed, (0 - p4vy) * fbSpeed)
    projectile.setKind(SpriteKind.FB4)
    info.player4.changeScoreBy(-1)
}
function updateP1 () {
    p1Launcher.setImage(p1LauncherImages[p1Direction])
}
function launchP3 () {
    p3vx = Math.cos(PI * p3Direction / 16)
    p3vy = Math.sin(PI * p3Direction / 16)
    projectile = sprites.createProjectileFromSprite(assets.image`fb`, p3Launcher, p3vx * fbSpeed, (0 - p3vy) * fbSpeed)
    projectile.setKind(SpriteKind.FB3)
    info.player3.changeScoreBy(-1)
}
function updateP2 () {
    p2Launcher.setImage(p2LauncherImages[p2Direction])
}
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    launchP4()
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (p2Direction > 0) {
        p2Direction += -1
    }
    updateP2()
})
controller.player4.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (p4Direction > 0) {
        p4Direction += -1
    }
    updateP4()
})
function launchP1 () {
    p1vx = Math.cos(PI * p1Direction / 16)
    p1vy = Math.sin(PI * p1Direction / 16)
    projectile = sprites.createProjectileFromSprite(assets.image`fb`, p1Launcher, p1vx * fbSpeed, p1vy * fbSpeed)
    projectile.setKind(SpriteKind.FB1)
    info.changeScoreBy(-1)
}
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    launchP3()
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
    if (p4Direction < p4LauncherImages.length - 1) {
        p4Direction += 1
    }
    updateP4()
})
controller.player3.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (p3Direction < p3LauncherImages.length - 1) {
        p3Direction += 1
    }
    updateP3()
})
let p1vy = 0
let p1vx = 0
let p3vy = 0
let p3vx = 0
let p4vy = 0
let p4vx = 0
let projectile: Sprite = null
let p2vy = 0
let p2vx = 0
let fbVyValues: number[] = []
let fbVxValues: number[] = []
let round = 0
let fbSpeed = 0
let PI = 0
let targetSprite: Sprite = null
let p4Direction = 0
let p4Launcher: Sprite = null
let p3Direction = 0
let p3Launcher: Sprite = null
let p2Direction = 0
let p2Launcher: Sprite = null
let p1Direction = 0
let p1Launcher: Sprite = null
let p4LauncherImages: Image[] = []
let p3LauncherImages: Image[] = []
let p2LauncherImages: Image[] = []
let p1LauncherImages: Image[] = []
game.showLongText("Use left and right to change your angle.\\n \\nPress A to launch a football.\\n \\nHow many times can you hit the target?", DialogLayout.Full)
p1LauncherImages = [
assets.image`p1_7`,
assets.image`p1_6`,
assets.image`p1_5`,
assets.image`p1_4`,
assets.image`p1_3`,
assets.image`p1_2`,
assets.image`p1_1`,
assets.image`p1_0`
]
p2LauncherImages = [
assets.image`p2_0`,
assets.image`p2_1`,
assets.image`p2_2`,
assets.image`p2_3`,
assets.image`p2_4`,
assets.image`p2_5`,
assets.image`p2_6`,
assets.image`p2_7`
]
p3LauncherImages = [
assets.image`p3_0`,
assets.image`p3_1`,
assets.image`p3_2`,
assets.image`p3_3`,
assets.image`p3_4`,
assets.image`p3_5`,
assets.image`p3_6`,
assets.image`p3_7`
]
p4LauncherImages = [
assets.image`p4_0`,
assets.image`p4_1`,
assets.image`p4_2`,
assets.image`p4_3`,
assets.image`p4_4`,
assets.image`p4_5`,
assets.image`p4_6`,
assets.image`p4_7`
]
p1Launcher = sprites.create(assets.image`p1_7`, SpriteKind.Player)
p1Launcher.setPosition(10, 20)
p1Direction = 0
updateP1()
p2Launcher = sprites.create(assets.image`p2_0`, SpriteKind.Player)
p2Launcher.setPosition(150, 20)
p2Direction = 0
p3Launcher = sprites.create(assets.image`p3_0`, SpriteKind.Player)
p3Launcher.setPosition(10, 100)
p3Direction = 0
p4Launcher = sprites.create(assets.image`p4_0`, SpriteKind.Player)
p4Launcher.setPosition(150, 100)
p4Direction = 0
targetSprite = sprites.create(assets.image`target`, SpriteKind.Enemy)
targetSprite.setBounceOnWall(true)
PI = Math.atan2(0, -1)
fbSpeed = 50
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
