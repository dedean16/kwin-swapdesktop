# Swap/Add/Remove - Virtual Desktop Shortcuts

<img src="logo/logo5_rect.png" height="180"/>

Adds keyboard shortcuts to KWin for swapping, adding and removing virtual desktops.

Updated to the Plasma 6 API. Works with both Wayland and X11.

### Default shortcuts
| Action                                       | Shortcut                    |
| :------------------------------------------- | :-------------------------- |
| Swap current desktop with next               | Meta + Shift + Alt + Right  |
| Swap current desktop with above              | Meta + Shift + Alt + Up     |
| Swap current desktop with below              | Meta + Shift + Alt + Down   |
| Swap current desktop with previous           | Meta + Shift + Alt + Left   |
| Add new desktop after current                | Meta + Shift + Alt + +      |
| Add new desktop before current               | Meta + Alt + =              |
| Remove current desktop (merge with next)     | Meta + Shift + Alt + _      |
| Remove current desktop (merge with previous) | Meta + Alt + -              |

These can be changed in System Settings → Global Shortcuts → KWin → (search for swapdesktop2)

Quick demo video: https://www.youtube.com/watch?v=TOOlC8laRNQ

## Infinite Swap mode

Infinite Swap mode: Swap virtual desktops beyond the existing set of desktops, i.e. when swapping to the 0th/last+1 desktop, a new desktop will be added to make the swap possible. Swapping back from the first/last desktop will remove the leading/trailing desktop (if empty). This allows for a fast workflow where most virtual desktop operations can be achieved by a combination of swapping shortcuts and KDE's built-in desktop selection shortcuts (by default: Meta + Ctrl + Arrow Key). Infinite Swap is enabled by default, but can be disabled in the configuration dialog of this script (System Settings → KWin Scripts → click the Configure button).

## For developers

Cleanup of leftover components can be done by loggin out/in and then running this kde cleanup command:

`qdbus org.kde.kglobalaccel /component/kwin org.kde.kglobalaccel.Component.cleanUp`

## References

1. Plasma scripting API: <https://develop.kde.org/docs/plasma/kwin/api/>
2. Plasma scripting tutorial: <https://develop.kde.org/docs/plasma/kwin/>
3. Plasma scripting tutorial: <https://develop.kde.org/docs/plasma/scripting/>
