controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    launchP1()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (p1Direction < p1LauncherImages.length - 1) {
        p1Direction += 1
    }
    updateP1()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (p1Direction > 0) {
        p1Direction += -1
    }
    updateP1()
})
function updateP1 () {
    p1Launcher.setImage(p1LauncherImages[p1Direction])
}
function launchP1 () {
    p1vx = Math.cos(PI * p1Direction / 16)
    p1vy = Math.sin(PI * p1Direction / 16)
    projectile = sprites.createProjectileFromSprite(assets.image`fb`, p1Launcher, p1vx * fbSpeed, p1vy * fbSpeed)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    if (targetSprite.vx < 0) {
        targetSprite.vx += -10
    } else {
        targetSprite.vx += 10
    }
})
let projectile: Sprite = null
let p1vy = 0
let p1vx = 0
let fbSpeed = 0
let PI = 0
let targetSprite: Sprite = null
let p1Direction = 0
let p1Launcher: Sprite = null
let p1LauncherImages: Image[] = []
game.showLongText("User left and right to change your angle.\\n \\nPress A to launch a football.\\n \\nHow many times can you hit the target?", DialogLayout.Full)
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
p1Launcher = sprites.create(assets.image`p1_0`, SpriteKind.Player)
p1Launcher.setPosition(10, 10)
p1Direction = 0
updateP1()
targetSprite = sprites.create(assets.image`target`, SpriteKind.Enemy)
targetSprite.setVelocity(50, 0)
targetSprite.setBounceOnWall(true)
PI = Math.atan2(0, -1)
fbSpeed = 50
info.startCountdown(30)
