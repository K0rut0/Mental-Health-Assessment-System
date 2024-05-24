"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu"
import Image from "next/image"


  function AdminNav(){
      return(
          <NavigationMenu className="flex flex-row p-3">
              <Image src={`/logo.png`} alt="logo" width={50} height={50}></Image>
              <NavigationMenuItem className="list-none">
                  <Link href="/admin/home" legacyBehavior passHref>
                    <NavigationMenuLink>
                      Home
                    </NavigationMenuLink>
                  </Link>
              </NavigationMenuItem>
          </NavigationMenu>
      )
  }

  export default AdminNav