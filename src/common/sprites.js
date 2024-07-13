
const SPRITES_PATH = './assets/img/sprites/';
const SPRITE_HEIGTH = 16;
const SPRITE_WIDTH = 16;
const SPRITE_RUNING_SPEED = 1000 / 8; /* A animação tem somente dois quadros */

const Sprite = (filename) => ({
    path: SPRITES_PATH + filename,
    front: { x: FaceIndex.front * SPRITE_WIDTH, y: 0 },
    back: { x: FaceIndex.back * SPRITE_WIDTH, y: 0 },
    left: { x: FaceIndex.left * SPRITE_WIDTH, y: 0 },
    right: { x: FaceIndex.right * SPRITE_WIDTH, y: 0 },
    runningFront: [{ x: 0, y: 0 - FaceIndex.runningFront * SPRITE_HEIGTH }, { x: 0 - SPRITE_WIDTH, y: 0 -FaceIndex.runningFront * SPRITE_HEIGTH }],
    runningBack: [{ x: 0, y: 0 - FaceIndex.runningBack * SPRITE_HEIGTH }, { x: 0 - SPRITE_WIDTH, y: 0 -FaceIndex.runningBack * SPRITE_HEIGTH }],
    runningLeft: [{ x: 0, y: 0 - FaceIndex.runningLeft * SPRITE_HEIGTH }, { x: 0 - SPRITE_WIDTH, y: 0 -FaceIndex.runningLeft * SPRITE_HEIGTH }],
    runningRight: [{ x: 0, y: 0 -FaceIndex.runningRight * SPRITE_HEIGTH }, { x: 0 - SPRITE_WIDTH, y: 0 - FaceIndex.runningRight * SPRITE_HEIGTH }],
});

const FaceIndex = {
    front: 2,
    back: 0,
    left: 1,
    right: 3,
    runningFront: 3,
    runningBack: 1,
    runningLeft: 2,
    runningRight: 4,
};

class SpriteCtrl {

    _el = null;
    _sprite = null;
    _intervalId = null;
    _currentFace = null;

    constructor(el, sprite) {

        this._el = el;
        this._sprite = sprite;

        this._setView(this._sprite.front);
    }

    /***
     * @param face front | back | left | right | runningFront | runningBack | runningLeft | runningRight
     */
    setView = (faceName) => {

        if (this._currentFace === faceName)
            return;

        this._currentFace = faceName;
        const face = this._sprite[faceName];
        this._faceIndex = Array.isArray(face) ? 0 : null;
        this._setView(face);
    }

    getCurrentFace = () => this._currentFace;

    dispose = () => {

        this._intervalId && clearInterval(this._intervalId);
    }

    updateView = () => {

        const face = this._sprite[this._currentFace];

        if (Array.isArray(face)) {

            this._updateSprite(face[this._faceIndex]);
            this._faceIndex++;
            if (this._faceIndex >= face.length)
                this._faceIndex = 0;
        }
        else
            this._updateSprite(face);

    }

    _updateSprite = (face) => {

        this._el.style.height = `${SPRITE_HEIGTH}px !important`;
        this._el.style.width = `${SPRITE_WIDTH}px !important`;
        this._el.style.background = `url(${this._sprite.path}) ${face.x}px ${face.y}px`;
    }

    _currentFace = null;
    _faceIndex = null;


    _setView = (face, pClearInterval = true) => {

        //this._currentFace = face;
       // this._faceIndex = Array.isArray(face) ? 0 : null;

        // pClearInterval && this._intervalId && clearInterval(this._intervalId);

        // if (Array.isArray(face)) {

        //     this._intervalId = setInterval((() => {

        //         let faceIndex = 0;

        //         return () => {

        //             this._setView(face[faceIndex], false);
        //             faceIndex++;
        //             if (faceIndex >= face.length)
        //                 faceIndex = 0;
        //         };

        //     })(), SPRITE_RUNING_SPEED);

        //     return;
        // }

        // this._updateSprite(face);
    }
};