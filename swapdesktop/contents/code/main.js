/*
*   Copyright (c) 2024 Daniël Cox <danielcox16@gmail.com>
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
        
    } else if (newdesktop == 0) {
        workspace.desktops++;                                   /* Add extra desktop */
        
        workspace.clientList().forEach(
            function(w, i) {
                
                if (w.desktop > 1) {
                    w.desktop++;                                /* Move all windows forward except from first first desktop */
                }
                
            }
        );
        
    } else if (newdesktop == workspace.desktops + 1) {
        workspace.desktops++;                                   /* Add extra desktop */
        
        workspace.clientList().forEach(
            function(w, i) {
                
                if (w.desktop == workspace.currentDesktop) {
                    w.desktop = newdesktop;                     /* Move windows from current desktop to new one */
                }
                
            }
        );
        workspace.currentDesktop = newdesktop;
    }
}


function addDesktops(n, addindex) {
    /* n is number of desktops to add */
    workspace.desktops = workspace.desktops + n;                /* Increase number of desktops by n */
    
    workspace.clientList().forEach(                             /* Loop over all windows */
        function(w, i) {
            if (w.desktop >= addindex) {                        /* If window desktop has index addindex or higher */
                w.desktop = w.desktop + n;                      /* Move window n desktops further */
            }
        }
    );
}


if (registerShortcut) {                                         /* Check if the register function actually exists */
    
    registerShortcut("Swap with Next Desktop",                  /* Register shortcut for 'swap with next desktop' */
                     "DESKTOPS: Swap current desktop with next one.",
                     "Meta+Shift+Alt+Right",
                     function() {swapDesktop(1);});
    
    registerShortcut("Swap with Previous Desktop",              /* Register shortcut for 'swap with previous desktop' */
                     "DESKTOPS: Swap current desktop with previous one.",
                     "Meta+Shift+Alt+Left",
                     function() {swapDesktop(-1);});

    registerShortcut("Swap with Above Desktop",                 /* Register shortcut for 'swap with above desktop' */
                     "DESKTOPS: Swap current desktop with one above.",
                     "Meta+Shift+Alt+Up",
                     function() {swapDesktop(-workspace.desktopGridWidth);});
    
    registerShortcut("Swap with Below Desktop",                 /* Register shortcut for 'swap with below desktop' */
                     "DESKTOPS: Swap current desktop with one below.",
                     "Meta+Shift+Alt+Down",
                     function() {swapDesktop(workspace.desktopGridWidth);});
    
    registerShortcut("Add Desktop",                             /* Register shortcut for 'add desktop' */
                     "DESKTOPS: Add new desktop between previous and current one.",
                     "Meta+Alt++",
                     function() {addDesktops(1, workspace.currentDesktop);});

    registerShortcut("Remove Desktop",                          /* Register shortcut for 'insert desktop' */
                     "DESKTOPS: Remove current desktop and move its windows to the next.",
                     "Meta+Alt+_",
                     function() {addDesktops(-1, workspace.currentDesktop + 1);});
}
