{/* <Grid item onClick={toggleMenu} className={classes.calendar}>
        <Icon type="menu" />
        <p>Menu</p>
      </Grid>
      
      <Drawer anchor="bottom" open={showMenu} onClose={toggleMenu}>
        <div className={classes.drawer}>
          <div className={clsx(classes.rightMenu, classes.rightMenuMobile)}>
            <div>
              <Link href={sponsorship.href}>
                <a
                  className={
                    asPath === sponsorship.href ||
                    asPath.includes(sponsorship.href)
                      ? classes.mobileDrawerActiveMobile
                      : null
                  }
                >
                  <span>{sponsorship.txt}</span>
                </a>
              </Link>
            <br/>
            
                <a
                onClick={toggleModal1}
                  className={
                    asPath === partenaires.href ||
                    asPath.includes(partenaires.href)
                      ? classes.mobileDrawerActiveMobile
                      : null
                  }
                >
                  <span>{partenaires.txt}</span>
                </a>
                <br/>
                <Link href='https://kitlenid.fr/blog'>
                <a>
                  Blog
                </a>
              </Link>
              
            </div>
           {/* <UpdateProfile
              text="Mon compte"
              user={user}
              logout={logout}
              update={update}
              transparent
            />
             <div>
              <Btn
                text="Prendre rendez-vous"
                iconType="calendar"
                onClick={() =>
                  openPopupWidget({ url: 'https://calendly.com/kitlenid' })
                }
              />
            </div> */}
          //</div>
        //</div>
      //</Drawer> */}