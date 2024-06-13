# Swap/Add/Remove - Virtual Desktop Shortcuts

Adds keyboard shortcuts to KWin that swap the windows of the current virtual desktop with those of the next/previous/upper/lower desktop, add a desktop at/after the current position, or remove the current desktop (and move its windows to the previous/next desktop). When swapping to the 0th/last+1 desktop, a new desktop will be added to make the swap possible. Updated to the Plasma 6 API. Works with both Wayland and X11.

Default shortcuts are: Meta+(Shift)+Alt+Right/Left/Up/Down/=/-. These can be changed in System Settings → Global Shortcuts → KWin → (search for swapdesktop2)

## To do: add gif animation of swap

## For developers

Cleanup of leftover components can be done by loggin out/in and then running this kde cleanup command:

`qdbus org.kde.kglobalaccel /component/kwin org.kde.kglobalaccel.Component.cleanUp`

## References

1. Plasma scripting API: <https://develop.kde.org/docs/plasma/kwin/api/>
2. Plasma scripting tutorial: <https://develop.kde.org/docs/plasma/kwin/>
3. Plasma scripting tutorial: <https://develop.kde.org/docs/plasma/scripting/>
