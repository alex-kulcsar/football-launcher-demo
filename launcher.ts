namespace SpriteKind {
    //% iskind
    export const P1Football = SpriteKind.create()
    //% iskind
    export const P2Football = SpriteKind.create()
    //% iskind
    export const P3Football = SpriteKind.create()
    //% iskind
    export const P4Football = SpriteKind.create()
}

interface FbLauncher {
    sprite: Sprite
    shadow: Sprite
    shadowImage: Image
    direction: number
    invertX: boolean
    invertY: boolean
}

//% color=#AF7817 icon="\uf44e"
namespace launcher {
    const DIRECTION_DIVISIONS: number = 8
    const MARKER_FILL_COLOR: number = 1
    const MARKER_BORDER_COLOR: number = 10

    let launchers: FbLauncher[] = []
    let fbImage: Image = null
    let fbSpeed: number = 50
    let needsInit: boolean = true

    //% block
    //% player.defl=1
    export function decreaseAngle(player: number): void {
        if (player < 0 || player > 4) {
            return
        }
        if (launchers[player].direction > 0) {
            launchers[player].direction--
            updateShadow(player)
        }
    }

    //% block
    //% player.defl=1
    export function launchFootball(player: number): void {
        if (player < 0 || player > 4) {
            // Probably should throw an error,
            // + but we'll be nice. :-)
            return
        }
        let fb: Sprite = null
        if (fbImage === null) {
            fb = sprites.create(sprites.builtin.football1, SpriteKind.Projectile)
        } else {
            fb = sprites.create(fbImage, SpriteKind.Projectile)
        }

        switch (player) {
            case 1:
                fb.setKind(SpriteKind.P1Football)
                break

            case 2:
                fb.setKind(SpriteKind.P2Football)
                break

            case 3:
                fb.setKind(SpriteKind.P3Football)
                break

            case 4:
                fb.setKind(SpriteKind.P4Football)
                break
        }
        
        let p: FbLauncher = launchers[player]
        let s: Sprite = p.sprite
        if (p.invertX) {
            fb.right = s.right
        } else {
            fb.left = s.left
        }
        if (p.invertY) {
            fb.bottom = s.bottom
        } else {
            fb.top = s.top
        }
        fb.setFlag(SpriteFlag.AutoDestroy, true)

        let theta: number = getAngle(player)
        let vx: number = Math.cos(theta) * fbSpeed
        let vy: number = Math.sin(theta) * fbSpeed
        fb.setVelocity(vx, vy)
    }

    //% block
    //% player.defl=1
    export function increaseAngle(player: number): void {
        if (player < 0 || player > 4) {
            return
        }
        if (launchers[player].direction < DIRECTION_DIVISIONS) {
            launchers[player].direction++
            updateShadow(player)
        }
    }

    //% block
    //% speed.defl = 25
    export function setFootballSpeed(speed: number): void {
        if (needsInit) {
            init()
        }
        fbSpeed = speed
    }

    //% block="set sprite $sprite for player $player"
    //% player.defl=1
    export function setPlayerSprite(sprite: Sprite, player: number): void {
        if (needsInit) {
            init()
        }
        if (player < 0 || player > 4) {
            return
        }
        let p: FbLauncher = launchers[player]
        p.sprite = sprite
        updateShadow(player)
    }

    function getAngle(player: number): number {
        /**
         *  PI        dir
         * --- * -------------
         *  2    NUM DIVISIONS
         */
        // return Math.PI * launchers[player].direction / (DIRECTION_DIVISIONS << 1)
        return Math.PI * launchers[player].direction / (DIRECTION_DIVISIONS * 2)
    }

    function init(): void {
        launchers.push(null) // Don't use index zero
        // Player 1
        let player: FbLauncher = {
            sprite: null,
            shadow: null,
            shadowImage: null,
            direction: 0,
            invertX: false,
            invertY: false,
        }
        launchers.push(player)

        // Player 2
        player = {
            sprite: null,
            shadow: null,
            shadowImage: null,
            direction: 0,
            invertX: true,
            invertY: false,
        }
        launchers.push(player)

        // Player 3
        player = {
            sprite: null,
            shadow: null,
            shadowImage: null,
            direction: 0,
            invertX: false,
            invertY: true,
        }
        launchers.push(player)

        // Player 4
        player = {
            sprite: null,
            shadow: null,
            shadowImage: null,
            direction: 0,
            invertX: true,
            invertY: true,
        }
        launchers.push(player)

        needsInit = false
    }

    function updateShadow(player: number): void {
        if (needsInit) {
            init()
            return
        }

        let p: FbLauncher = launchers[player]

        if (p === undefined ||
            p === null ||
            p.sprite === null) {
                return
        }

        if (p.shadow === null) {
            let s: Sprite = p.sprite
            let w: number = Math.max(s.width, s.height) + 4
            p.shadowImage = image.create(w, w)
            p.shadow = sprites.create(
                p.shadowImage, SpriteKind.Player
            )
            if (p.invertX) {
                p.shadow.right = s.right
            } else {
                p.shadow.left = s.left
            }
            if (p.invertY) {
                p.shadow.bottom = s.bottom
            } else {
                p.shadow.top = s.top
            }
        }

        let dir: number = p.direction
        let img: Image = p.shadowImage
        img.fill(0)
        // temporary border
        img.drawRect(0, 0, img.width, img.height, 1)
        if (dir < 5) {
            let x: number = img.width
            let y: number = Math.min(Math.max(Math.floor(x * Math.tan(getAngle(player))), 1), img.width - 3)
            img.drawRect(x - 3, y, 2, 2, MARKER_FILL_COLOR)
            img.drawRect(x - 4, y - 1, 4, 4, MARKER_BORDER_COLOR)
        } else {
            let y: number = 20
            let x: number = Math.min(Math.max(Math.floor(y / Math.tan(getAngle(player))), 1), img.width - 3)
            img.drawRect(x, y - 3, 2, 2, MARKER_FILL_COLOR)
            img.drawRect(x - 1, y - 4, 4, 4, MARKER_BORDER_COLOR)
        }
    }
}