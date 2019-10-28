/*
*   Copyright (c) 2019 Daniël Cox <danielcox16@gmail.com>
*
*   This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU Lesser General Public License as published by
*   the Free Software Foundation; either version 3.0 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*/

function swapDesktop(n) {
    /* n is the relative desktop number to swap to */
    var newdesktop = workspace.currentDesktop + n;              /* Desktop index of desktop to swap to */
    
    if (newdesktop >= 1 && newdesktop <= workspace.desktops) {
        workspace.clientList().forEach(                         /* Loop over all windows */
            function(w, i) {
                
                if (w.desktop == workspace.currentDesktop) {    /* If on current */
                    w.desktop = newdesktop;                     /* Swap window to new */
                    
                } else if (w.desktop == newdesktop) {           /* If on new */
                    w.desktop = workspace.currentDesktop;       /* Swap window to current */
                }
                
            }
        );
        
        workspace.currentDesktop = newdesktop;
    }
}


if (KWin.registerShortcut) {                                    /* Check if the register function actually exists */
    
    Kwin.registerShortcut("Swap with Next Desktop",             /* Register shortcut for 'swap with next desktop' */
                          "Swap all windows from the current desktop with the next one.",
                          "Meta+Shift+Alt+Right",
                          swapDesktop(1));
    
    Kwin.registerShortcut("Swap with Previous Desktop",         /* Register shortcut for 'swap with previous desktop' */
                          "Swap all windows from the current desktop with the previous one.",
                          "Meta+Shift+Alt+Left",
                          swapDesktop(-1));
}
