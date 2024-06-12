# Swap/Add/Remove - Virtual Desktop Shortcuts

Adds keyboard shortcuts to KWin that swap the windows of the current virtual desktop with those of the next/previous/upper/lower desktop, or add/remove a desktop at the current position. When swapping to the 0th/last+1 desktop, a new desktop will be added to make the swap possible. When removing a desktop, its windows will be moved to the next desktop.

Default shortcuts are: Meta+Shift+Alt+Right/Left/Up/Down/=/-. These can be changed in System Settings → Global Shortcuts → KWin → (search for DESKTOPS)

## References

1. Plasma scripting API: <https://develop.kde.org/docs/plasma/kwin/api/>
2. Plasma scripting tutorial: <https://develop.kde.org/docs/plasma/kwin/>
3. Plasma scripting tutorial: <https://develop.kde.org/docs/plasma/scripting/>
