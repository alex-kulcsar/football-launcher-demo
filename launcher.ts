namespace SpriteKind {
    //% isKind
    export const P1Football = SpriteKind.create()
    //% isKind
    export const P2Football = SpriteKind.create()
    //% isKind
    export const P3Football = SpriteKind.create()
    //% isKind
    export const P4Football = SpriteKind.create()
    //% isKind
    export const Target = SpriteKind.create()
}

interface FbLauncher {
    sprite: Sprite
    shadow: Sprite
    shadowImage: Image
    direction: number
    invertX: boolean
    invertY: boolean
}

interface Point {
    x: number
    y: number
}

//% color=#AF7817 icon="\uf44e"
namespace launcher {
    const DIRECTION_DIVISIONS: number = 8
    const MARKER_FILL_COLOR: number = 1
    const FOOTBALL_KINDS: number[] = [
        SpriteKind.P1Football,
        SpriteKind.P2Football,
        SpriteKind.P3Football,
        SpriteKind.P4Football,
    ]

    let launchers: FbLauncher[] = []
    let fbImage: Image = null
    let fbSpeed: number = 50
    let needsInit: boolean = true
    let targetVelocities: number[][] = []
    let currRound: number = -1
    let targets: Sprite[] = []
    let roundLength: number = 30
    let targetSpeedup: number = 10
    let markerColors: number[] = [10, 10, 10, 10, 10]

    //% block
    export function addRound(vx: number, vy: number): void {
        let round: number[] = [vx, vy,]
        targetVelocities.push(round)
    }

    //% block
    export function addTarget(sprite: Sprite): void {
        targets.push(sprite)
    }

    //% block
    export function currentRound(): number {
        return currRound + 1
    }

    //% block
    //% player.defl=1
    export function decreaseAngle(player: number): void {
        if (player < 1 || player > 4) {
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
        if (player < 1 || player > 4) {
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
        fb.setFlag(SpriteFlag.AutoDestroy, true)

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
        let theta: number = getAngle(player)
        let vx: number = Math.cos(theta) * fbSpeed
        let vy: number = Math.sin(theta) * fbSpeed
        if (p.invertX) {
            fb.right = s.right
            vx = 0 - vx
        } else {
            fb.left = s.left
        }
        if (p.invertY) {
            fb.bottom = s.bottom
            vy = 0 - vy
        } else {
            fb.top = s.top
        }
        fb.setVelocity(vx, vy)
    }

    //% block
    //% player.defl=1
    export function increaseAngle(player: number): void {
        if (player < 1 || player > 4) {
            return
        }
        if (launchers[player].direction < DIRECTION_DIVISIONS) {
            launchers[player].direction++
            updateShadow(player)
        }
    }

    //% block
    export function increaseTargetSpeed(target: Sprite): void {
        if (target.vx < 0) {
            target.vx -= targetSpeedup
        }
        if (target.vx > 0) {
            target.vx += targetSpeedup
        }
        if (target.vy < 0) {
            target.vy -= targetSpeedup
        }
        if (target.vy > 0) {
            target.vy += targetSpeedup
        }
    }

    //% block="number of rounds"
    export function numRounds(): number {
        return targetVelocities.length
    }

    //% block
    //% speed.defl = 25
    export function setFootballSpeed(speed: number): void {
        if (needsInit) {
            init()
        }
        fbSpeed = speed
    }

    //% block
    //% player.defl=1
    //% color.shadow=colorindexpicker
    export function setMarkerColor(player: number, color: number): void {
        if (player < 1 || player > 4) {
            return
        }
        markerColors[player] = color
        updateShadow(player)
    }

    //% block="set sprite $sprite for player $player"
    //% player.defl=1
    export function setPlayerSprite(sprite: Sprite, player: number): void {
        if (needsInit) {
            init()
        }
        if (player < 1 || player > 4) {
            return
        }
        let p: FbLauncher = launchers[player]
        p.sprite = sprite
        updateShadow(player)
    }

    //% block
    export function setRoundLength(seconds: number): void {
        // Zero disables timer.
        if (seconds >= 0) {
            roundLength = seconds
        }
    }

    //% block
    export function startNewRound(): void {
        if (currRound >= targetVelocities.length) {
            return
        }
        currRound++
        for (let k of FOOTBALL_KINDS) {
            sprites.destroyAllSpritesOfKind(k)
        }

        let currVelocities: number[] = targetVelocities[currRound]
        let vx: number = currVelocities[0]
        let vy: number = currVelocities[1]
        if (vx != 0 && Math.percentChance(50)) {
            vx = 0 - vx
        }
        if (vy != 0 && Math.percentChance(50)) {
            vy = 0 - vy
        }
        for(let s of targets) {
            s.setPosition(80, 60)
            s.setVelocity(vx, vy)
            s.setFlag(SpriteFlag.BounceOnWall, true)
        }

        if (roundLength > 0) {
            info.startCountdown(roundLength)
        }
    }

    function getAngle(player: number): number {
        /**
         *  PI        dir
         * --- * -------------
         *  2    NUM DIVISIONS
         */
        return Math.PI * launchers[player].direction / (DIRECTION_DIVISIONS << 1)
        // return Math.PI * launchers[player].direction / (DIRECTION_DIVISIONS * 2)
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
        if (player < 1 || player > 4) {
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
            let w: number = Math.max(s.width, s.height) + 8
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
            s.z = p.shadow.z + 1
        }

        let dir: number = p.direction
        let img: Image = p.shadowImage
        img.fill(0)
        // temporary border
        // img.drawRect(0, 0, img.width, img.height, 1)
        let origin: Point = {x: 1, y: 1}
        let marker: Point = {x: 0, y: 0}
        let color: number = markerColors[player]
        if (dir < 5) {
            marker.x = img.width - 3
            marker.y = Math.min(Math.max(Math.floor(
                marker.x * Math.tan(getAngle(player))), 1), img.width - 3)
        } else {
            marker.y = img.width - 3
            marker.x = Math.min(Math.max(Math.floor(
                marker.y / Math.tan(getAngle(player))), 1), img.width - 3)
        }
        let mid: number = img.width / 2
        if (p.invertX) {
            origin.x = img.width - 1
            marker.x = mid + mid - marker.x // mid - (marker.x - mid)
        }
        if (p.invertY) {
            origin.y = img.width - 1
            marker.y = mid + mid - marker.y - 2 // mid - (marker.y - mid)
            img.drawLine(origin.x, origin.y, marker.x, marker.y + 2, color)
            img.drawLine(origin.x - 1, origin.y, marker.x - 1, marker.y + 2, color)
            img.drawLine(origin.x + 1, origin.y, marker.x + 1, marker.y + 2, color)
            img.drawLine(origin.x, origin.y + 1, marker.x, marker.y + 3, color)
            img.drawLine(origin.x, origin.y - 1, marker.x, marker.y + 1, color)
        } else {
            img.drawLine(origin.x, origin.y, marker.x, marker.y, color)
            img.drawLine(origin.x - 1, origin.y - 1, marker.x - 1, marker.y - 1, color)
            img.drawLine(origin.x + 1, origin.y + 1, marker.x + 1, marker.y + 1, color)
            img.drawLine(origin.x, origin.y - 1, marker.x, marker.y - 1, color)
            img.drawLine(origin.x, origin.y + 1, marker.x, marker.y + 1, color)
        }
        img.drawRect(marker.x, marker.y, 2, 2, MARKER_FILL_COLOR)
        img.drawRect(marker.x - 1, marker.y - 1, 4, 4, color)
    }
}